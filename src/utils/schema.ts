import { Schema } from 'mongoose';

export default (schema: Schema) => {
    schema.pre(/^find/, (next) => {
        if (this.deletedAt == null) {
            next()
        }
    });

    return schema;
}