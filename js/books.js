$('#Books').DataTable({
	"columnDefs": [
		{ "type": "num", "targets": 0 },
		{ "type": "num", "targets": 1 },
	],
	"lengthMenu": [[-1, 10, 25, 50], ["All", 10, 25, 50]],
	"order": []
});
