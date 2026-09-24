import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Phone, Facebook, Instagram, Mail, Clock, Send } from "lucide-react";

export const metadata = { title: "Contacto - Jueces Gallísticos", description: "Contáctanos para información y presupuestos" };

export default function ContactoPage() {
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
            <Link href="/galeria" className="hover:text-primary">Galería</Link>
            <Link href="/contacto" className="text-primary font-medium">Contacto</Link>
          </nav>
          <Button asChild><Link href="/contacto">Contratar</Link></Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¿Quieres contratarnos para tu evento? Solicita información y presupuestos sin compromiso. Estamos disponibles para ayudarte.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8 flex-1">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" />Teléfonos</CardTitle>
                <CardDescription>Llámanos para información inmediata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="tel:+526182711051" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Phone className="h-5 w-5 text-green-600" /></div>
                  <div><p className="font-medium">+52 618 271 1051</p><p className="text-sm text-muted-foreground">Teléfono principal</p></div>
                </a>
                <a href="tel:+522211743456" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><Phone className="h-5 w-5 text-green-600" /></div>
                  <div><p className="font-medium">+52 221 174 3456</p><p className="text-sm text-muted-foreground">Teléfono secundario</p></div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Correo Electrónico</CardTitle>
                <CardDescription>Escríbenos para presupuestos detallados</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:juecesgallisticos@gmail.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Mail className="h-5 w-5 text-blue-600" /></div>
                  <div><p className="font-medium">juecesgallisticos@gmail.com</p><p className="text-sm text-muted-foreground">Correo principal</p></div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Facebook className="h-5 w-5 text-primary" />Redes Sociales</CardTitle>
                <CardDescription>Síguenos en nuestras redes sociales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://www.facebook.com/share/19crkTFZ6U/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Facebook className="h-5 w-5 text-blue-600" /></div>
                  <div><p className="font-medium">Facebook</p><p className="text-sm text-muted-foreground">Jueces Gallísticos</p></div>
                </a>
                <a href="https://www.instagram.com/naita7723" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"><Instagram className="h-5 w-5 text-pink-600" /></div>
                  <div><p className="font-medium">Instagram</p><p className="text-sm text-muted-foreground">@naita7723</p></div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Horario de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Lunes - Viernes:</span><span className="font-medium">9:00 AM - 8:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Sábados:</span><span className="font-medium">9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Domingos:</span><span className="font-medium">Solo eventos</span></div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Solicita tu Presupuesto</CardTitle>
                <CardDescription>Completa el formulario y te contactaremos pronto</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action="https://formsubmit.co/juecesgallisticos@gmail.com" method="POST">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input id="name" name="name" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+52 XXX XXX XXXX" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Fecha del evento</Label>
                      <Input id="event-date" name="event-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input id="location" name="location" placeholder="Ciudad, Estado" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <textarea id="message" name="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Cuéntanos sobre tu evento: número de gallos, tipo de evento, servicios que necesitas, etc." required />
                  </div>
                  <input type="hidden" name="_subject" value="Nueva solicitud de presupuesto - Jueces Gallísticos" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4" />Enviar Solicitud
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">Te contactaremos en un máximo de 24 horas hábiles.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Jueces Gallísticos. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}