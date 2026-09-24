import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Shield, Phone, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Nosotros - Jueces Gallísticos", description: "Conoce a nuestro equipo de jueces gallísticos profesionales" };

export default function NosotrosPage() {
  const judges = [
    { role: "Juez de Asiento", icon: Trophy, description: "Encargado del control del tiempo y la puntuación oficial del combate. Mantiene el registro preciso de cada evento.", responsibilities: ["Control del reloj de asiento", "Registro de puntuación oficial", "Control del tiempo de combate", "Validación de resultados finales"] },
    { role: "Juez de Arena", icon: Award, description: "Supervisa directamente el desarrollo del combate dentro del área de competencia.", responsibilities: ["Supervisión del combate", "Aplicación de reglamentos", "Decisiones dentro del área", "Control del desarrollo del combate"] },
    { role: "Juez de Zona de Amarre", icon: Shield, description: "Responsable de la zona de amarre y preparación de los gallos.", responsibilities: ["Supervisión de zona de amarre", "Verificación de preparación", "Control de reglamentos de amarre", "Coordinación con participantes"] },
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
            <Link href="/nosotros" className="text-primary font-medium">Nosotros</Link>
            <Link href="/galeria" className="hover:text-primary">Galería</Link>
            <Link href="/contacto" className="hover:text-primary">Contacto</Link>
          </nav>
          <Button asChild><Link href="/contacto">Contratar</Link></Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Somos un equipo de tres jueces profesionales con amplia experiencia en eventos gallísticos. Nos dedicamos a garantizar transparencia, profesionalismo y cumplimiento de los reglamentos en cada evento.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <Card className="bg-secondary/30">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Nuestra Experiencia</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div><div className="text-4xl font-bold text-primary mb-2">3</div><p className="text-muted-foreground">Jueces Profesionales</p></div>
              <div><div className="text-4xl font-bold text-primary mb-2">100%</div><p className="text-muted-foreground">Transparencia</p></div>
              <div><div className="text-4xl font-bold text-primary mb-2">∞</div><p className="text-muted-foreground">Eventos Realizados</p></div>
            </div>
            <div className="mt-8 max-w-3xl mx-auto text-center text-muted-foreground">
              <p>Nuestro equipo combina experiencia en juzgamiento con tecnología de punta para ofrecer un servicio profesional y transparente. Contamos con equipo de cómputo para el cotejo, sistema de bocina, pantallas, báscula digital y todo lo necesario para que tu evento sea un éxito.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 py-16 flex-1">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
        <div className="space-y-8">
          {judges.map((judge, index) => (
            <Card key={judge.role} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className={`p-8 flex items-center justify-center ${index % 2 === 0 ? "bg-primary/5" : "bg-primary/10"}`}>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <judge.icon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl">{judge.role}</h3>
                  </div>
                </div>
                <div className="md:col-span-2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl mb-2">{judge.role}</CardTitle>
                    <CardDescription className="text-base">{judge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold mb-3">Responsabilidades:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {judge.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {resp}
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
            <h2 className="text-3xl font-bold mb-4">¿Quieres conocernos en persona?</h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">Contáctanos para agendar una reunión o solicitarnos información sobre nuestros servicios.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contacto"><Phone className="h-4 w-4" />Contáctanos</Link>
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