				import worker, * as OTHER_EXPORTS from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/.wrangler/tmp/pages-he8X1x/functionsWorker-0.22883317277102666.mjs";
				import * as __MIDDLEWARE_0__ from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap,__MIDDLEWARE_1__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/Users/nilemiller/Documents/code/pages-functions-countries-demo/.wrangler/tmp/pages-he8X1x/functionsWorker-0.22883317277102666.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;