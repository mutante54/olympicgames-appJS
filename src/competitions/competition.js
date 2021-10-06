export class Competition {
    constructor(opts) {
        this.sportType = '';
        this.eventPlace = '';
        this.dateTimeStarts = '';
        this.dateTimeFinish = '';
        this.nation1 = '';
        this.nation2 = '';
        this.competitionStageType = '';

        Object.assign(this, opts);
    }
}