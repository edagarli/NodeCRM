var keepMeSignedIn = {
    run: function(){
    	Ext.Ajax.request({
			url : '/admin/account/keep',
			success : function(response) {
				
			}
		});
    },
    interval: 1000*60*10 //10分钟
};
var findReceivedComment = {
    run: function(){
    	Ext.Ajax.request({
			url : '/admin/comment/receivedcomment',
			success : function(response) {
				
			}
		});
    },

    interval: 1000*60*5 //5分钟
};

var task = new Ext.util.DelayedTask(function(){
	Ext.TaskManager.start(keepMeSignedIn);
	//Ext.TaskManager.start(findReceivedComment);
});
task.delay(60*1000);