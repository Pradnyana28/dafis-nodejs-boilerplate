import { Model, Types } from 'mongoose';

import Logger from '@utils/logger';

class BaseModel {
    protected defaultQuery: object;
    protected model: Model<any>;

    // share variable within derived class
    protected schema;
    protected logger: Logger;

    protected primaryKey: string = '_id';

    protected constructor() {
        this.logger = new Logger();
        this.defaultQuery = { deletedAt: null };
    }

    /**
     * @method all
     * -------------------------------------------
     * Query all data
     * -------------------------------------------
     * @param limit limit the output data
     * @param sort sort the output data
     */
    public async all(limit: number = null, sort: any = { createdAt: -1 }): Promise<any[]> {
        try {
            if (limit) {
                return await this.model
                    .find({ ...this.defaultQuery })
                    .limit(limit)
                    .sort(sort)
                    .exec();
            }
            return await this.model
                .find({ ...this.defaultQuery })
                .sort(sort)
                .exec();
        } catch (err) {
            this.logger.error('Failed loading schema data', err, __filename);
            return [];
        }
    }


    /**
     * @method find
     * -------------------------------------------
     * Query specific data
     * -------------------------------------------
     * @param whereClause the where conditions
     * @param limit limit the output data
     * @param sort sort the output data
     */
    public async find(whereClause: object = {}, limit: number = null, sort: any = { createdAt: -1 }): Promise<any[]> {
        try {
            if (limit) {
                return await this.model
                    .find({ ...this.defaultQuery, ...whereClause })
                    .limit(limit)
                    .sort(sort)
                    .exec();
            }
            return await this.model
                .find({ ...this.defaultQuery, ...whereClause })
                .sort(sort)
                .exec();
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return [];
        }
    }

    /**
     * @method findById
     * -------------------------------------------
     * Fetch an object with specified identifier
     * -------------------------------------------
     * @param id mongo object identifier
     */
    public async findById(id: string): Promise<any> {
        try {
            return await this.findOne({ ...this.defaultQuery, [this.primaryKey]: id });
        } catch (err) {
            this.logger.error('Failed while retrieving schema identifier', err, __filename);
            return null;
        }
    }

    /**
     * @method findOne
     * -------------------------------------------
     * Fetch an object by conditions
     * -------------------------------------------
     * @param whereClause the where condition
     */
    public async findOne(whereClause: object): Promise<any> {
        try {
            return await this.model.findOne({ ...this.defaultQuery, ...whereClause });
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return null;
        }
    }

    /**
     * @method create
     * -------------------------------------------
     * Insert object to the database
     * -------------------------------------------
     * @param data the insert object
     */
    public async create(data: object): Promise<any> {
        try {
            return await this.model.create(data);
        } catch (err) {
            this.logger.error('Failed while creating schema data', err, __filename);
            return null;
        }
    }

    /**
     * @method updateById
     * -------------------------------------------
     * Update all collection data by mongo object identifier
     * -------------------------------------------
     * @param id mongo object identifier
     * @param updateClause object to update
     */
    public async updateById(id: string, updateClause: object): Promise<any> {
        try {
            const data = await this.model.updateOne({ ...this.defaultQuery, [this.primaryKey]: id }, updateClause);
            if (data) {
                return await this.findById(id);
            }
            return null;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return null;
        }
    }

    /**
     * @method update
     * -------------------------------------------
     * Update all collection data by where conditions
     * -------------------------------------------
     * @param whereClause the where conditions
     * @param updateClause object to update
     */
    public async update(whereClause: object, updateClause: object): Promise<any> {
        try {
            const data = await this.model.updateMany({ ...this.defaultQuery, ...whereClause }, updateClause);
            if (data) {
                return await this.find(whereClause);
            }
            return [];
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return [];
        }
    }

    /**
     * @method updateOne
     * -------------------------------------------
     * Update a collection by where condition
     * -------------------------------------------
     * @param whereClause the where conditions
     * @param updateClause object to update
     */
    public async updateOne(whereClause: object, updateClause: object): Promise<any> {
        try {
            const data = await this.model.updateOne({ ...this.defaultQuery, ...whereClause }, updateClause);
            if (data) {
                return await this.findOne(whereClause);
            }
            return null;
        } catch (err) {
            this.logger.error('Failed while retrieving schema data', err, __filename);
            return null;
        }
    }

    /**
     * @method deleteById
     * -------------------------------------------
     * Delete the collection by mongo object identifier
     * -------------------------------------------
     * @param id mongo object identifier
     */
    public async deleteById(id: Types.ObjectId): Promise<boolean> {
        try {
            return await this.model.updateOne({ ...this.defaultQuery, [this.primaryKey]: id }, { deletedAt: new Date() })
                ? true : false;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return false;
        }
    }

    /**
     * @method delete
     * -------------------------------------------
     * Delete all collection with where condition
     * -------------------------------------------
     * @param whereClause the where conditions
     */
    public async delete(whereClause: object): Promise<boolean> {
        try {
            return this.model.updateMany({ ...this.defaultQuery, ...whereClause }, { deletedAt: new Date() })
                ? true : false;
        } catch (err) {
            this.logger.error('Failed while deleting schema object', err, __filename);
            return false;
        }
    }
}

export default BaseModel;