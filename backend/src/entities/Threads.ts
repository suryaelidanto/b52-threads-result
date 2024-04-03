import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({ name: "thread" })
export class Thread {
    @PrimaryGeneratedColumn()
    id: number 

    @Column({ nullable: true })
    content: string

    @Column({ nullable: true })
    image: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date

    @ManyToOne(() => User, (user) => user.threads, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User
}
