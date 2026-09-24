import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Laptop, Printer, Mic, Weight, Circle, Monitor, CheckCircle2, Phone } from "lucide-react";

export const metadata = { title: "Servicios - Jueces Gallísticos", description: "Servicios profesionales para eventos gallísticos" };

export default function ServiciosPage() {
  const services = [
    { icon: Laptop, title: "Cotejo por Computadora", description: "Sistema digital de calificación en tiempo real que garantiza transparencia total en los resultados.", features: ["Calificación digital en tiempo real", "Transparencia total en resultados", "Registro electrónico de puntos", "Eliminación de errores manuales"] },
    { icon: Printer, title: "Hojas de Enfrentamientos Impresas", description: "Entregamos hojas de enfrentamientos impresas profesionalmente para todos los participantes y organizadores.", features: ["Hojas impresas de alta calidad", "Para todos los participantes", "Formato profesional", "Entrega inmediata"] },
    { icon: Mic, title: "Servicio de Bocina con Micrófonos", description: "Sistema de sonido profesional con micrófonos para el animador, jueces y organizadores.", features: ["Sistema de sonido profesional", "Micrófonos para animador", "Micrófonos para jueces", "Calidad de audio garantizada"] },
    { icon: Circle, title: "Anillos para los Gallos", description: "Contamos con anillos numerados para la correcta identificación de los gallos.", features: ["Anillos numerados", "Identificación precisa", "Material resistente", "Diferentes tamaños"] },
    { icon: Weight, title: "Báscula Digital", description: "Báscula digital de alta precisión para el pesaje oficial de los animales.", features: ["Alta precisión", "Pesaje oficial", "Pantalla digital legible", "Calibración profesional"] },
    { icon: Monitor, title: "Pantallas para el Evento", description: "Dos pantallas profesionales: una para el reloj de asiento y otra para los enfrentamientos.", features: ["Pantalla para reloj de asiento", "Pantalla para enfrentamientos", "Alta visibilidad", "Actualización en tiempo real"] },
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
            <Link href="/servicios" className="text-primary font-medium">Servicios</Link>
            <Link href="/nosotros" className="hover:text-primary">Nosotros</Link>
            <Link href="/galeria" className="hover:text-primary">Galería</Link>
            <Link href="/contacto" className="hover:text-primary">Contacto</Link>
          </nav>
          <Button asChild><Link href="/contacto">Contratar</Link></Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Contamos con todo el equipo y servicios necesarios para que tu evento gallístico sea un éxito total. Profesionalismo garantizado.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8 flex-1">
        <div className="space-y-8">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="bg-primary/5 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                </div>
                <div className="md:col-span-2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para contratar nuestros servicios?</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Contáctanos para información detallada y presupuestos personalizados según las necesidades de tu evento.
            </p>
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