var todoapp = new Vue({
    el:'#todoapp',
    data: {
        list: [],
        showList: [],
        newTodo:"",
        newDeadline: "",
        isHurry: [
            true,
        ],
        isNotouch: [],
        isProcessing: [],
        isComplete: [],
    },
    computed: {
        listCount: function(){
            return this.list.length;
        },
        listNotouch: function(){
            var result = this.list.filter(function(e){
                return e.status === '未着手'
            });
            return result;
        },
        listProcessing: function(){
            var result = this.list.filter(function(e){
                return e.status === '処理中'
            });
            return result;
        },
        listComplete: function(){
            var result = this.list.filter(function(e){
                return e.status === '完了'
            });
            return result;
        },
    },
    methods: {
        addList: function(){
            this.list.push({
                text: this.newTodo,
                deadline: this.newDeadline,
                status: '未着手',
            })
            this.showList.push({
                text: this.newTodo,
                deadline: this.newDeadline,
                status: '未着手',
            })
            this.isHurry.push(true);
            this.isNotouch.push(true);
            this.isProcessing.push(false);
            this.isComplete.push(false);
        },
        updateStatus: function(index){
            var targetList = this.list[index];
            var targetStatusProc = this.isProcessing;
            var targetStatusComp = this.isComplete;
            
            if(targetList.status === '未着手'){
                targetList.status = '処理中';
                targetStatusProc.splice(index,1,true)
            }else if(targetList.status === '処理中'){
                targetList.status = '完了';
                targetStatusComp.splice(index,1,true)
            }else {
                if(window.confirm('削除しますか？')){
                    this.list.splice(index,1)
                }
            }
        },
        deleteTodo: function(index){
            if(window.confirm('削除しますか？')){
                this.list.splice(index,1)
                this.isNotouch.splice(index,1)
                this.isProcessing.splice(index,1)
                this.isComplete.splice(index,1)
            }
        },
        filterReset: function(){
            var resetTarget = this.showList; 
            return resetTarget = this.list;
        },
        filterNotouch: function(){
            for (let i=0 ; i < this.list.length ; i++){
                if(this.showList[i].status !== '未着手' ){
                    this.showList.splice(i,1)
                }
            }
        },
    }
})