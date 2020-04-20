export class Utility {

    getTimeToday(): string {
      const today = new Date();
      const dd = this.getMyString(today.getDate());
      const mm = this.getMyString(today.getMonth() + 1);
      const mn = this.getMyString(today.getMinutes());
      const hr = this.getMyString(today.getHours());
      return dd + mm + today.getFullYear().toString() + hr + mn;
    }
  
    private getMyString(mytime: number): string {
      if (mytime < 10) {
        return '0' + mytime;
      } else {
        return mytime.toString();
      }
    }

    getMonthAndYear(): string {
      const today = new Date();
      const mm = this.getMyString(today.getMonth() + 1);
      return mm + today.getFullYear().toString();
    }
  
    getDay(today: Date): string {
      const dd = this.getMyString(today.getDate());
      const mm = this.getMyString(today.getMonth() + 1);
      return dd + '-' + mm + '-' + today.getFullYear().toString();
    }
  
    daysInMonth() {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate();
    }
  
    daysInMonthWithArgs(month: number, year: number) {
      return new Date(year, month, 0).getDate();
    }
  
    isNumber(n) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }

    getTime() {
      return new Date().getTime();
    }

   getWeek () {
      let date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      let week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    
    // Returns the four-digit year corresponding to the ISO week of the date.
    getWeekYear () : string {
      let date = new Date(this.getTime());
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      return this.getWeek() + date.getFullYear().toString();
    }
  }
  