import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award, Trophy, Shield, Mic, Monitor, Weight, Circle, Printer, Laptop,
  Facebook, Instagram, Phone, ChevronRight, Camera,
} from "lucide-react";

export default function Home() {
  const services = [
    { icon: Laptop, title: "Cotejo por Computadora", description: "Sistema digital de calificación en tiempo real para transparencia total." },
    { icon: Printer, title: "Hojas de Enfrentamientos", description: "Entregamos hojas de enfrentamientos impresas para todos los participantes." },
    { icon: Mic, title: "Bocina con Micrófonos", description: "Servicio de sonido profesional con micrófonos para el animador y jueces." },
    { icon: Circle, title: "Anillos para Gallos", description: "Contamos con anillos numerados para la identificación de los gallos." },
    { icon: Weight, title: "Báscula Digital", description: "Báscula digital de precisión para el pesaje oficial de los animales." },
    { icon: Monitor, title: "Pantallas", description: "Dos pantallas: una para el reloj de asiento y otra para los enfrentamientos." },
  ];

  const judges = [
    { role: "Juez de Asiento", description: "Encargado del control del tiempo y la puntuación oficial del combate.", icon: Trophy },
    { role: "Juez de Arena", description: "Supervisa el desarrollo del combate dentro del área de competencia.", icon: Award },
    { role: "Juez de Zona de Amarre", description: "Responsable de la zona de amarre y preparación de los gallos.", icon: Shield },
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
            <Link href="/#servicios" className="hover:text-primary">Servicios</Link>
            <Link href="/nosotros" className="hover:text-primary">Nosotros</Link>
            <Link href="/galeria" className="hover:text-primary">Galería</Link>
            <Link href="/contacto" className="hover:text-primary">Contacto</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild><Link href="/contacto">Contratar</Link></Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            Jueces Profesionales con Experiencia
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Jueces Gallísticos
          <span className="block text-primary mt-2">Profesionales</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Servicios profesionales de juzgamiento para eventos gallísticos.
          Contamos con equipo de cómputo, bocina, pantallas, báscula digital y
          todo lo necesario para un evento exitoso.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" asChild><Link href="/contacto">Solicitar Presupuesto</Link></Button>
          <Button size="lg" variant="outline" asChild><Link href="/servicios">Ver Servicios</Link></Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16">
          <div><div className="text-3xl font-bold text-primary">3</div><div className="text-sm text-muted-foreground">Jueces</div></div>
          <div><div className="text-3xl font-bold text-primary">6+</div><div className="text-sm text-muted-foreground">Servicios</div></div>
          <div><div className="text-3xl font-bold text-primary">100%</div><div className="text-sm text-muted-foreground">Profesional</div></div>
          <div><div className="text-3xl font-bold text-primary">∞</div><div className="text-sm text-muted-foreground">Eventos</div></div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Jueces</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contamos con tres jueces especializados para garantizar la transparencia y profesionalismo en cada evento
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {judges.map((judge) => (
              <Card key={judge.role} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <judge.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{judge.role}</CardTitle>
                  <CardDescription className="mt-2">{judge.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos todo el equipo y servicios necesarios para que tu evento gallístico sea un éxito total
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Quieres contratarnos para tu evento?</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Contáctanos para información y presupuestos. Estamos disponibles para eventos en toda la región.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contacto"><Phone className="h-4 w-4" />Solicitar Presupuesto</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="https://www.facebook.com/share/19crkTFZ6U/" target="_blank"><Facebook className="h-4 w-4" />Facebook</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t mt-auto bg-secondary/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-semibold">Jueces Gallísticos</span>
              </div>
              <p className="text-sm text-muted-foreground">Servicios profesionales de juzgamiento para eventos gallísticos.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/servicios" className="hover:text-primary">Servicios</Link></li>
                <li><Link href="/nosotros" className="hover:text-primary">Nosotros</Link></li>
                <li><Link href="/galeria" className="hover:text-primary">Galería</Link></li>
                <li><Link href="/contacto" className="hover:text-primary">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+52 618 271 1051</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+52 221 174 3456</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Redes Sociales</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://www.facebook.com/share/19crkTFZ6U/" target="_blank"><Facebook className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://www.instagram.com/naita7723" target="_blank"><Instagram className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Jueces Gallísticos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}