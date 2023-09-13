import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {

    @Prop()
    Job: string;

    @Prop()
    Name: string;

    @Prop()
    password: string;

    @Prop()
    Surname: string;

    @Prop()
    username: string;
}



export const userSchema = SchemaFactory.createForClass(User);