var todoapp = new Vue({
    el:'#todoapp',
    data: {
        list: [],
        newTodo:""
    },
    computed: {
        listCount: function(){
            return this.list.length;
        },
        listNotouch: function(){
            var result = this.list.filter(function(e){
                return e.status === '未着手'
            });
            return result.length;
        },
        listProcessing: function(){
            var result = this.list.filter(function(e){
                return e.status === '処理中'
            });
            return result.length;
        },
        listComplete: function(){
            var result = this.list.filter(function(e){
                return e.status === '完了'
            });
            return result.length;
        },
    },
    methods: {
        addList: function(){
            this.list.push({
                text: this.newTodo,
                status: '未着手',
            })
        },
        updateStatus: function(index){
            var targetList = this.list[index];
            
            if(targetList.status === '未着手'){
                targetList.status = '処理中';
            }else if(targetList.status === '処理中'){
                targetList.status = '完了';
            }else {
                if(window.confirm('削除しますか？')){
                    this.deleteTodo(index);
                }
            }
        },
        deleteTodo: function(index){
            this.list.splice(index,1)
        },
    }
})