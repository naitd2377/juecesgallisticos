import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users, Award, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Jueces Gallísticos</span>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            Plataforma profesional para jueces oficiales
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Sistema de Gestión para
          <span className="block text-primary mt-2">Jueces Gallísticos</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Plataforma profesional para la gestión de eventos, peleas y
          calificaciones. Diseñada específicamente para jueces oficiales.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/registro">Comenzar Ahora</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Ya tengo cuenta</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          <div>
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Digital</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Disponible</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Eventos</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Funcionalidades principales</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar eventos gallísticos en un solo lugar
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestión de Eventos</CardTitle>
              <CardDescription>
                Crea y administra eventos con fechas, ubicaciones y descripciones
                detalladas. Mantén un control completo de cada evento.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Panel de Jueces</CardTitle>
              <CardDescription>
                Cada juez tiene su propio panel para calificar peleas de manera
                independiente y transparente.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Calificaciones</CardTitle>
              <CardDescription>
                Sistema de puntajes transparente con histórico de calificaciones
                por evento y estadísticas en tiempo real.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="mb-8 opacity-90 max-w-xl mx-auto">
              Únete a la plataforma y empieza a gestionar tus eventos gallísticos
              de manera profesional.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/registro">Crear cuenta</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">Jueces Gallísticos</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Jueces Gallísticos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
