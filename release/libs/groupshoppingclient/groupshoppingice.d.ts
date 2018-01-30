
// v 1.0.0.1

declare module LuckyGroupShoppingC {

    var connection:any;
    var communicator:any;
    var serverprx:any;
    var sessionmgprx:any;
    var ident:any;


    class LuckyGroupShoppingClient {

        constructor();

        public isApp():boolean;

        public connectInit(userGuid:string, gameInfoId:string, gameGuid:string, gameMode:number, isWss:boolean):void;

        public refresh(gameGuid:string, gameInfoId:string):void;

        public getDiscountResult(gameGuid:string, gameInfoId:string, currentLevel:number, gameMode:number);

        public setIdentifyingCode(cellphoneNumber: string): void;

        public checkActivate(): boolean;

        public submitDatas(cellphoneNumber: string, code: string): void;

        public updateBusiness(gameGuid:string, gameInfoId:string, gameMode:number, betin:number, payout_discount:number, payout_coupon:number, productname:string, modename:string):void;

        public destroyServer(gameGuid:string, gameInfoId:string, gameMode:number, betin:number, payout_discount:number, payout_coupon:number, productname:string, modename:string):void;

        public destroyClient():void;

        public closeGame(auth:string, mode:number, orderid:string, state:string, fromAdd:string):void;

        public startGame();

        public getAddressMessage():any;

        public GetRound(num:number):number;

        public getHostIndex():number;

        public getCloseGameState():number;

        public getCommodityName():string;

        public getGroupCount():number;

        public getCurrentGroupCount():number;

        public getTotalDiscount():number;

        public getGroupPrice():number;

        public getPersonalDiscountList():number[];

        public getIsConnect():number;

        public setIsConnect(is:number):void;

        public getFloorPrice():number;

        public getCeilingPrice():number;

        public getQuantity():number;

        public getUnsignIn():number;

        public getSignAgain(): number;

        public getOrderError(): number;

        public getGameMode():number;

        public setIsReConnect(r:number):void;

        public getIsSignIn(): boolean;

        public getDiscount(): number;
        public resumeDiscount(): void;

        public getCurrentLevel(): number;

        public getTimeSpan(): string;

        public getSubmitResult(): number;
        public resumeSubmitResult();

        public getSubmitMsg(): string;
    }
}