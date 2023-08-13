export function catchAsync(msg: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			try {
				return await originalMethod.apply(this, args);
			} catch (error) {
				console?.error(`${msg}异常.${args}, ${propertyKey}:${error} `);
				originalMethod?.catch(error);
			}
		};
		return descriptor;
	};
}

export function catchError(msg: string) {
	return function catchError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			try {
				return originalMethod.apply(this, args);
			} catch (error) {
				console.error(`${msg}异常. ${propertyKey}: ${error}`);
				throw error;
			}
		};

		return descriptor;
	};
}
