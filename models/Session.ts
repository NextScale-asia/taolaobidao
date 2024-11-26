import { compareSync } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    BelongsToCreateAssociationMixin
} from 'npm:@sequelize/core';
import {
	Attribute,
	AutoIncrement,
	BelongsTo,
	Default,
	NotNull,
	PrimaryKey,
	Unique,
} from 'npm:@sequelize/core/decorators-legacy';
import { Account } from '$models';
export class Session
	extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
	@Attribute(DataTypes.INTEGER)
	@PrimaryKey
	@AutoIncrement
	declare id: CreationOptional<number>;

	@Attribute(DataTypes.STRING)
	@NotNull
	@Unique
	declare sessionId: string;

	@Attribute(DataTypes.STRING)
	declare ipAddress: string | null;

	@Attribute(DataTypes.STRING)
	declare userAgent: string | null;

	@Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(true)
	declare isOnline: boolean | null;

	@Attribute(DataTypes.BOOLEAN)
    @NotNull
    @Default(true)
	declare isUsing: boolean | null;



	@BelongsTo(() => Account, {
		foreignKey: 'accountId',
		inverse: {
			as: 'sessions',
			// Either 'hasOne' or 'hasMany'
			type: 'hasMany',
		},
	})
	declare account?: NonAttribute<Account>;

	// This is the foreign key
	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare accountId: number;

    declare getAccount: BelongsToGetAssociationMixin<Account>;
    declare setAccount: BelongsToSetAssociationMixin<Account, Session['accountId']>;
}
