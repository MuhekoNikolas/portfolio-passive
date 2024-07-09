Database = require("better-sqlite3")

/**
 * Class representing a pool of database connections.
 */
class DBPool {
    /**
     * Create a pool of database connections.
     * @param {string} dbFile - The database file path.
     * @param {number} dbPoolSize - The size of the database pool.
     */
    constructor(dbFile, dbPoolSize) {
        this.dbFile = dbFile
        this.dbPoolSize = dbPoolSize
        this.DBs = []

        // Initialize the pool with the specified number of database connections
        for (var _x = 0; _x < dbPoolSize; _x++) {
            this.addNewDb()
        }
    }

    /**
     * Get a random database connection from the pool.
     * @returns {object} A database connection.
     */
    getRandomDB() {
        if (this.DBs.length > 0) {
            var choosenDB = this.DBs[Math.floor(Math.random() * this.DBs.length)]
            this.DBs.splice(this.DBs.indexOf(choosenDB), 1)
            this.addNewDb()
            return choosenDB
        } else {
            this.addNewDb()
            this.addNewDb()
            var choosenDB = this.DBs[Math.floor(Math.random() * this.DBs.length)]
            this.DBs.splice(this.DBs.indexOf(choosenDB), 1)
            return choosenDB
        }
    }

    /**
     * Commit the current transaction.
     */
    commit() {
        this.prepare("COMMIT").run()
    }

    /**
     * Add a new database connection to the pool.
     */
    addNewDb() {
        var _DBPoolLength = this.DBs.length
        var _newDB = new Database(this.dbFile, {})
        this.DBs.push(_newDB)
    }
}

/**
 * Class representing a SQLite database with a connection pool.
 */
class SqliteDB {
    /**
     * Create a SQLite database.
     * @param {string} dbFile - The database file path.
     * @param {number} dbPoolSize - The size of the database pool.
     */
    constructor(dbFile, dbPoolSize) {
        this.dbFile = dbFile
        this.dbPoolSize = dbPoolSize

        // Initialize the database pool and create tables
        this.createDBPool()
        this.createTables()
    }

    /**
     * Create a pool of database connections.
     */
    createDBPool() {
        this.DBPool = new DBPool(this.dbFile, this.dbPoolSize)
    }

    /**
     * Create necessary database tables if they do not exist.
     */
    createTables() {
        var _DB = this.DBPool.getRandomDB()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS users( id UNSIGNED NOT NULL PRIMARY KEY, fullName VARCHAR(20) NOT NULL DEFAULT 'John Doe', profilePicture UNSIGNED NOT NULL DEFAULT 'http://localhost:2000/images/pfp.jpg', email VARCHAR(255) UNIQUE DEFAULT NULL, is_editor INTEGER DEFAULT 1,  google_id VARCHAR(255) UNIQUE DEFAULT NULL,  facebook_id VARCHAR(255) UNIQUE DEFAULT NULL, twitter_id VARCHAR(255) UNIQUE DEFAULT NULL, github_id VARCHAR(255) UNIQUE DEFAULT NULL, discord_id VARCHAR(255) UNIQUE DEFAULT NULL);`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS drafts( id UNSIGNED NOT NULL PRIMARY KEY, author_id UNSIGNED NOT NULL, content TEXT NOT NULL DEFAULT '');`).run()
        _DB.prepare(`CREATE TABLE IF NOT EXISTS blogs(id UNSIGNED NOT NULL PRIMARY KEY, blog_url_id TEXT NOT NULL, author_id UNSIGNED NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, banner TEXT NOT NULL, content TEXT NOT NULL, readingTime UNSIGNED NOT NULL DEFAULT '0', created_at UNSIGNED NOT NULL);`).run()
        this.closeDB(_DB)
    }

    /**
     * Commit the current transaction.
     * @param {object} _DB - The database connection.
     */
    commit(_DB) {
        _DB.prepare("COMMIT").run()
    }

    /**
     * Close the database connection.
     * @param {object} _DB - The database connection.
     */
    closeDB(_DB) {
        _DB.close()
    }
}

// Export an instance of the SqliteDB class with the specified database file and pool size
module.exports = new SqliteDB("./backendResources/databases/Blogs.sqlite", 10)
