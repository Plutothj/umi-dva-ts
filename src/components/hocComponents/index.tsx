import DataSource from './DataSource'
import React from 'react';

let withSubscription = (WrappedComponent:any,selectData:any) =>{
    return class extends React.Component{
        constructor(props:any){
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data:selectData(DataSource,props)
            }
        }

        componentDidMount(){
            console.log("------hoc--------",this.props,selectData)
            DataSource.addChangeListener(this.handleChange)
        }

        componentWillUnmount(){
            DataSource.removeChangeListener(this.handleChange)
        }


        handleChange(){
            this.setState({
                data:selectData(DataSource, this.props)
            });
        }

        render(){
            // ……使用最新的数据渲染组件
            // 注意此处将已有的props属性传递给原组件
            const style = {
                'marginBottom':'30px'
            }
            return(
                <div style={style}>
                    <div>This is a HOC Component...</div>
                    <WrappedComponent data={(this as any).state.data} {...this.props} />
                </div>
            );
                
            
        }
    }
}

export default withSubscription;