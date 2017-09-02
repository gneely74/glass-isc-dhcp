/**
 * Created by cmiles on 8/9/2017.
 */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	var request = req.body;
	var json_file = require('jsonfile');
	var glass_config = json_file.readFileSync('config/glass_config.json');

	glass_config.shared_network_critical_threshold = request.shared_network_critical_threshold;
	glass_config.shared_network_warning_threshold = request.shared_network_warning_threshold;
	glass_config.lease_per_second_threshold = request.lease_per_second_threshold;
	glass_config.slack_webhook_url = request.slack_webhook_url;
	glass_config.slack_alert_channel = request.slack_alert_channel;

	json_file.writeFile('./config/glass_config.json', glass_config, {spaces: 2}, function(err) {
		console.error(err);
	});

	res.send('<script type="text/javascript">notification(\'Saved Alert Settings!\')</script>');
});

module.exports = router;