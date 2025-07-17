import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "user",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type:DataType.STRING,
  })
  declare currentInstituteNumber:string;

  @Column({
    type: DataType.ENUM("student", "teacher", "institute", "super-admin"),
    defaultValue: "student",
  })
  declare role: string;
}
export default User;
