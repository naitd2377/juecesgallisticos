import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Camera, Phone, Calendar, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Galería - Jueces Gallísticos", description: "Galería de eventos donde hemos trabajado como jueces" };

export const dynamic = "force-dynamic";

export default async function GaleriaPage() {
  let fotos: any[] = [];
  try {
    fotos = await prisma.foto.findMany({
      orderBy: { createdAt: "desc" },
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
            <Link href="/eventos" className="hover:text-primary">Eventos</Link>
            <Link href="/galeria" className="text-primary font-medium">Galería</Link>
            <Link href="/contacto" className="hover:text-primary">Contacto</Link>
          </nav>
          <Button asChild><Link href="/contacto">Contratar</Link></Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <Camera className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Galería de Eventos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estos son algunos de los eventos donde hemos trabajado como jueces oficiales.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8 flex-1">
        {fotos.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aún no hay fotos</h3>
              <p className="text-muted-foreground mb-4">
                Pronto subiremos fotos de nuestros eventos. Vuelve pronto para verlas.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fotos.map((foto) => (
              <Card key={foto.id} className="overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.url}
                    alt={foto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{foto.title}</h3>
                  {foto.eventName && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3" />{foto.eventName}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(foto.createdAt).toLocaleDateString("es-ES", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </div>
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
            <p className="mb-8 opacity-90 max-w-xl mx-auto">Contáctanos para información y presupuestos. Tu evento puede aparecer aquí en nuestra galería.</p>
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