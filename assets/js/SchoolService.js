let db;

export default class TodoService {

    constructor() {
        this.initDB();
    }

    initDB() {
        db = new Dexie('SchoolDB');
    
        db.version(1).stores({
            reports: '++id,name, theme, score'
        });
    
        db.on('populate', async () => {
            
            await db.reports.bulkPut([
              { name: 'Clara', theme: 'Matemática', score: '10.0' },
              { name: 'Roberto', theme: 'Física', score: '1.0' },
              { name: 'Silvia',  theme: 'Português', score: '2.0' },
              { name: 'Marcos',  theme: 'Ed. Física', score: '9.0' }
            ]);
          });
    }

    save(report) {
        return db.reports.put(report);
    }

    getById(id) {
        return db.reports.get(id);
    }

    delete(id) {
        return db.reports.delete(id);
    }

    getAll() {
        return db.reports.toArray();
    }
    
}
