import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, MapPin, Phone, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Eventos - Jueces Gallísticos", description: "Próximos eventos donde participaremos como jueces" };

export const dynamic = "force-dynamic";

export default async function EventosPage() {
  let events: any[] = [];
  try {
    events = await prisma.event.findMany({
      where: { status: { in: ["PROGRAMADO", "EN_PROGRESO"] } },
      orderBy: { date: "asc" },
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Jueces Gallísticos</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <Link href="/servicios" className="hover:text-primary">Servicios</Link>
            <Link href="/nosotros" className="hover:text-primary">Nosotros</Link>
            <Link href="/eventos" className="text-primary font-medium">Eventos</Link>
            <Link href="/galeria" className="hover:text-primary">Galería</Link>
            <Link href="/contacto" className="hover:text-primary">Contacto</Link>
          </nav>
          <Button asChild><Link href="/contacto">Contratar</Link></Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <Calendar className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Próximos Eventos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estos son los eventos donde participaremos como jueces oficiales. Si quieres que juzguemos tu evento, contáctanos.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8 flex-1">
        {events.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos programados</h3>
              <p className="text-muted-foreground mb-4">
                Actualmente no tenemos eventos confirmados. Vuelve pronto para ver nuestras próximas participaciones.
              </p>
              <Button asChild>
                <Link href="/contacto"><Phone className="h-4 w-4" />Contratar nuestros servicios</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={event.status === "EN_PROGRESO" ? "success" : "warning"}>
                      {event.status === "EN_PROGRESO" ? "En progreso" : "Programado"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      day: "numeric", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.location && (
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{event.location}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Quieres que juzguemos tu evento?</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">Contáctanos para información y presupuestos. Tu evento puede aparecer aquí.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contacto"><Phone className="h-4 w-4" />Solicitar Presupuesto</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Jueces Gallísticos. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}