let DataSource = {
    getComments: () => {
        return [
            'comment1', 'comment2', 'comment3'
        ]
    },
    getBlogPost: () => {
        return 'BlogPost Contents';
    },
    addChangeListener: (_:any) => { console.log('addChangeListener') },
    removeChangeListener: (_:any) => { console.log('removeChangeListener') },
}
export default DataSource;