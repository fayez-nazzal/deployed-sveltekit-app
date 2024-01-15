import type { SSTConfig } from 'sst';
import { StaticSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'deployed-sveltekit-app',
			region: 'us-east-2'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new StaticSite(stack, 'site', {
				path: './build'
			});
			stack.addOutputs({
				url: site.url
			});
		});
	}
} satisfies SSTConfig;
