import React, { Component } from 'react'
import { Upload, message, Button, Icon,Table, Divider, Tag,Modal,Input  } from 'antd';
import { connect } from 'dva';
import XLSX from 'xlsx';
import styles from './index.css'
import * as service from '../../services/halfGoods/webapi'

class HalfPriceGoods extends Component<{},any> {
  constructor(props:any){
    super(props)
    const {app_key} = props
    this.state={
      visible: false,
      isshow:false,
      goodsinfo:{
        goodsName:'',
        linePrice:'',
        goodsPrice:'',
        goodsImg:'',
        goodsurl:'',
      },
      goodsName:'',
      linePrice:'',
      goodsPrice:'',
      goodsImg:'',
      goodsurl:'',
      data:[],
      columns:[
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
          
        },
        {
          title: '划线价格',
          dataIndex: 'linePrice',
          key: 'linePrice',
        },
        {
          title: '商品价格',
          dataIndex: 'goodsPrice',
          key: 'goodsPrice',
        },
        {
          title: '商品图片',
          dataIndex: 'goodsImg',
          key: 'goodsImg',
          render:(text:string)=>{
              return ( <img src={text} alt="" style={{width:'50px',height:'50px'}}/>)
          }
        },
        {
          title: '商品链接',
          dataIndex: 'goodsurl',
          key: 'goodsurl',
          render:(text:any) => <a>{text}</a>
        },
        {
          title: '操作',
          key: 'action',
          render: (text:any, record:any) => (
            <span>
               <Button type="primary" onClick={()=>this.editOneData(record)}>编辑</Button>
              <Divider type="vertical" />
              <Button type="danger" onClick={()=>this.dellOneData(record)}>删除</Button>
            </span>
          ),
        },
      ],
      dataprops:{
        name: 'file',
        action: '/api/?s=App.CDN.UploadOffice',
        headers: {
          authorization: 'authorization-text',
        },
        data:{
            app_key:app_key
        },
        beforeUpload: (file:any, fileList:any) => {
   
            let that = this
            var rABS = true;
            const f = fileList[0];
            var reader = new FileReader();
            reader.onload = function (e:any) {
                var data1 = e.target.result;
                if (!rABS) data1 = new Uint8Array(data1);
                var workbook = XLSX.read(data1, {
                    type: rABS ? 'binary' : 'array'
                });
                
                // 假设我们的数据在第一个标签
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                // XLSX自带了一个工具把导入的数据转成json
                var jsonArr:any= XLSX.utils.sheet_to_json(first_worksheet);
                // 通过自定义的方法处理Json，比如加入state来展示
                that.handleImpotedJson(jsonArr);
                
                console.log(jsonArr)
            };
            if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
            return false;
        },
        onChange(info:any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      }
    }
  }
  
  handleImpotedJson(json:any){
    this.setState({data:json})
    console.log('aaaaaaaaaa')
    let data  = this.state.data 
    service.UploadData(data).then((res:any)=>{
        console.log(res)
        if (res.ret == '200') {
          message.success('上传成功', 5);
        };


        
  })}
  dellOneData=(record:any)=>{
    let is = false
    console.log(record)

    service.delOnlyData(record.goodsName).then((res:any)=>{
      console.log(res)
      if (res.ret == '200') {
        message.success('修改成功', 5);
        this.getData() 
      }
    });
  }
  editOneData=(record:any)=>{
    this.setState({
      visible: true,
      
    });
    this.setState({
      goodsinfo: record,
      
    });

  }
  delAll =()=>{
    let that = (this as any)
    service.delAllData().then((res:any)=>{
      if (res.ret == '200') {
        message.success('删除成功', 5);
        that.setState({data:[]})
      };
    })
  }
  getData(){
    service.getData().then((res:any)=>{
      let info =  res.data.Result
        this.setState({data:info})
    })
  }
  

  handleOk = (e:any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.getData()
   
    
  };

  handleCancel = (e:any )=> {
    console.log(e);
    this.setState({
      visible: false,
    });
   
  };

  componentDidMount(){
    this.getData()
  }
  change1=(e:any)=>{
    let data = Object.assign({}, this.state.goodsinfo, {
      goodsName: e.target.value
    })
    this.setState({
     goodsinfo:data
    })

  }
  change2=(e:any)=>{
    let data = Object.assign({}, this.state.goodsinfo, {
      linePrice: e.target.value
    })
    this.setState({
      goodsinfo:data
    })
    service.UpdateOnlyData({linePrice:e.target.value},data.id).then(res=>{
      console.log(res)
    })
  }
  change4=(e:any)=>{
    let data = Object.assign({}, this.state.goodsinfo, {
      goodsImg: e.target.value
    })
    this.setState({
      
      goodsinfo:data
    })

  }
  change5=(e:any)=>{
    let data = Object.assign({}, this.state.goodsinfo, {
      goodsurl: e.target.value
    })
    this.setState({
      goodsinfo:data
    })

  }


  render() {
    return(
      <div className={styles.main}>
                <div className={styles.up}>
                <p>点击上传文件：</p>
                <Upload {...this.state.dataprops}>
                    <Button>
                    <Icon type="upload" /> 上传excel文件
                    </Button>
                </Upload>
                <Button type="primary" onClick={this.delAll}>删除全部</Button>
                </div>
                

                <Table  columns={this.state.columns} dataSource={this.state.data} />
                <Modal
                  title="商品编辑"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <p>goodsName:</p>
                 <Input placeholder="" value={this.state.goodsinfo.goodsName} onChange={(event)=>{this.change1(event)}}/>
                  <p>linePrice:</p>
                 <Input placeholder="" value={this.state.goodsinfo.linePrice} onChange={(event)=>{this.change2(event)}}/>
                 
                 <p>goodsImg:</p>
                 <Input placeholder="" value={this.state.goodsinfo.goodsImg} onChange={(event)=>{this.change4(event)}}/>
                 <p>goodsurl:</p>
                 <Input placeholder="" value={this.state.goodsinfo.goodsurl} onChange={(event)=>{this.change5(event)}}/>
                </Modal>
        </div>
        );
    }
}

const mapStateToProps=(state:any)=> {
    // 这个state是所有model层的state，这里只用到其中一个，所以state.testPage把命名空间为testPage这个model层的state数据取出来
    // es6语法解构赋值
    const { app_key } = state.halfModel;
    // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。props变化了，会重新触发render方法，界面也就更新了。
    return {
        app_key,
      // num:num, //同上，es6语法，key/value相同名时可以简写。
    };
}


export default connect(mapStateToProps)(HalfPriceGoods);
