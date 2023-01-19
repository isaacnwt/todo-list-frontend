class TaskList {
    private _list: Task[];

    constructor(
        private api: string,
        private userId: number
    ) { }

    async getTasks(): Promise<void> {
        try {
            const response = await fetch(`${this.api}?id=${this.userId.toString()}`);
            this._list = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.api, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}&user_id=${this.userId}`
            });
            const json = await response.json();
            if (response.status === 200) {
                console.log(json.msg);
                return true;
            } else {
                console.error(json.msg);
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    async createTask(title: string, description: string = null): Promise<boolean> {
        try {
            const response = await fetch(this.api, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `title=${title}&description=${description}&user_id=${this.userId}`
            });
            const json = await response.json();
            if (response.status === 201) {
                console.log(json.msg);
                return true;
            } else {
                console.error(json.msg);
                return false;
            }
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }



    get list(): Task[] {
        return this._list;
    }

} export { TaskList }