export class Constant {
	public static get USE_ANGULAR2JWT():boolean { return false; }
	public static get API_PATH():string {
		let env = 'localhost';
		if(env === 'localhost') {
			return 'http://localhost/record/public/api/';
		}
		else if(env === 'server') {
			return 'https://skyvory.net/record/public/api/';
		}
	}
}