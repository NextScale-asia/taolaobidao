import { compareSync } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import {
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyRemoveAssociationMixin,
    HasManyRemoveAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyHasAssociationsMixin,
    HasManyCountAssociationsMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'npm:@sequelize/core';
import {
	Attribute,
	AutoIncrement,
	Default,
	NotNull,
	PrimaryKey,
} from 'npm:@sequelize/core/decorators-legacy';
import { Session } from '$models';
export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
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

	/** Declared by {@link Session#account} */
	declare sessions?: Session[];

	isRightPassword(plainPassword: string): boolean {
		if (!this.password) {
			return false;
		}

		return compareSync(plainPassword, this.password);
	}

	declare getSessions: HasManyGetAssociationsMixin<Session>;
	declare setSessions: HasManySetAssociationsMixin<Session, Session['id']>;
	declare addSession: HasManyAddAssociationMixin<Session, Session['id']>;
	declare addSessions: HasManyAddAssociationsMixin<Session, Session['id']>;
	declare removeSession: HasManyRemoveAssociationMixin<Session, Session['id']>;
	declare removeSessions: HasManyRemoveAssociationsMixin<Session, Session['id']>;
	declare createSession: HasManyCreateAssociationMixin<Session, 'accountId'>;
	declare hasSession: HasManyHasAssociationMixin<Session, Session['id']>;
	declare hasSessions: HasManyHasAssociationsMixin<Session, Session['id']>;
	declare countSessions: HasManyCountAssociationsMixin<Session>;
}
