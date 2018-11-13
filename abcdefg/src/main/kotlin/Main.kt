import io.javalin.Javalin

fun main(args: Array<String>) {
    val app = Javalin.create()
        .enableStaticFiles("/public")
        .start(7008)

}