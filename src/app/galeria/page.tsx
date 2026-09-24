import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Camera, Phone, Calendar, MapPin } from "lucide-react";

export const metadata = { title: "Galería - Jueces Gallísticos", description: "Galería de eventos donde hemos trabajado como jueces" };

export default function GaleriaPage() {
  const events = [
    { title: "Torneo Regional 2024", date: "Marzo 2024", location: "Palenque Municipal", color: "from-amber-500 to-orange-600" },
    { title: "Evento Municipal", date: "Abril 2024", location: "Centro de Eventos", color: "from-blue-500 to-cyan-600" },
    { title: "Competencia Estatal", date: "Mayo 2024", location: "Arena Regional", color: "from-green-500 to-emerald-600" },
    { title: "Exhibición Especial", date: "Junio 2024", location: "Club Gallístico", color: "from-purple-500 to-pink-600" },
    { title: "Torneo Anual", date: "Julio 2024", location: "Palenque Central", color: "from-red-500 to-rose-600" },
    { title: "Evento Privado", date: "Agosto 2024", location: "Finca Privada", color: "from-indigo-500 to-blue-600" },
  ];

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
          Estos son algunos de los eventos donde hemos trabajado como jueces oficiales. Cada evento es una muestra de nuestro compromiso con la transparencia y el profesionalismo.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer">
              <div className={`aspect-video bg-gradient-to-br ${event.color} relative flex items-end p-6`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative text-white">
                  <Camera className="h-8 w-8 mb-2 opacity-80" />
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm opacity-90"><Calendar className="h-3 w-3" />{event.date}</div>
                  <div className="flex items-center gap-1 mt-1 text-sm opacity-90"><MapPin className="h-3 w-3" />{event.location}</div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Evento donde participamos como jueces oficiales con servicio completo de cotejo, bocina y pantallas.</p>
              </CardContent>
            </Card>
          ))}
        </div>
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