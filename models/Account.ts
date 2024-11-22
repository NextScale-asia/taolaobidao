import { compareSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "npm:@sequelize/core";
import {
    Attribute,
    AutoIncrement,
    NotNull,
    PrimaryKey,
    Default
} from "npm:@sequelize/core/decorators-legacy";
export class Account
    extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare username: string;

    @Attribute(DataTypes.STRING)
    declare email: string | null;

    @Attribute(DataTypes.STRING)
    declare password: string | null;

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(false)
    declare activated: CreationOptional<boolean>;

    @Attribute(DataTypes.STRING)
    declare activation_key: string | null;

    isRightPassword(plainPassword: string): boolean {
        if (!this.password) 
            return false
        
        return compareSync(plainPassword, this.password)
    }
}
