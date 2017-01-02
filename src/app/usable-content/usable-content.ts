/**
 *  content representation
 *  content may be basic or composite on any particular page
 *  ex: when building tiles: widgets are basic, tiles are composite
 *      when building pages: tiles and events are basic, pages are composite
 */
export class UsableContent {
    private type: string;
    private id: string;
    public metadata: {
        identifiers: {
            name: string,
            time_created: Date
        },
        timestamp: {
            time_window: number,
            start_time: Date      
        },
        /**
         * list of ids of contents from which this content is composed
         */
        composition: string[],
        other: any
    };




    /**
     *  @constructor
     */
    public constructor(type:string, id:string, metadata:any) {
        console.log('Creating new content...');
        this.type = type;
        this.id = id;
        this.metadata = metadata;
    }




    /**
     *  getters and setters
     */
    public getType(): string {
        return this.type;
    }

    public getId(): string {
        return this.id;
    }

    public getMetadata(): any {
        return this.metadata;
    }

    public getComposition(): string[] {
        return this.metadata.composition;
    }

    public getName(): string {
        return this.metadata.identifiers.name;
    }

    public getTimeCreated(): Date {
        return this.metadata.identifiers.time_created;
    }

    public setType(type:string) {
        this.type = type;
    }

    public setMetadata(metadata:any) {
        this.metadata = metadata;
    }

    public setName(name: string) {
        this.metadata.identifiers.name = name;
    }

}
