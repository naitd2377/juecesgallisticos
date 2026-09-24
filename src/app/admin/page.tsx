"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Loader2, Mail, Lock, LogOut, Plus, Trash2, Camera, Calendar, Trophy, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface User { id: string; name: string; email: string; role: string; }
interface EventItem { id: string; name: string; date: string; location: string | null; status: string; }

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      setUser(JSON.parse(userStr));
      fetchEvents(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchEvents = async (token: string) => {
    try {
      const res = await fetch("/api/eventos", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      toast.error("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Error"); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      fetchEvents(data.token);
      toast.success("¡Bienvenido!");
    } catch { toast.error("Error de conexión"); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setEvents([]);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!name || !date) { toast.error("Nombre y fecha son obligatorios"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, date: new Date(date).toISOString(), location, description }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Error"); return; }
      toast.success("Evento creado");
      setName(""); setDate(""); setLocation(""); setDescription("");
      setShowForm(false);
      fetchEvents(token);
    } catch { toast.error("Error de conexión"); }
    finally { setSubmitting(false); }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("¿Eliminar este evento?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`/api/eventos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { toast.error("Error"); return; }
      toast.success("Evento eliminado");
      fetchEvents(token);
    } catch { toast.error("Error"); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Jueces Gallísticos</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/"><ArrowLeft className="h-4 w-4" />Volver al inicio</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Acceso Administrador</CardTitle>
              <CardDescription>Ingresa tus credenciales para administrar el sitio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? (<><Loader2 className="h-4 w-4 animate-spin" />Iniciando sesión...</>) : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Panel Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Gestión de Eventos</h1>
            <p className="text-sm text-muted-foreground">Crea eventos que aparecerán en la página pública /eventos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/fotos"><Camera className="h-4 w-4" />Subir Fotos</Link>
            </Button>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4" />{showForm ? "Cancelar" : "Nuevo Evento"}
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Crear Nuevo Evento</CardTitle>
              <CardDescription>Completa la información del evento</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del evento *</Label>
                    <Input id="name" placeholder="Ej: Torneo Regional 2025" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha y hora *</Label>
                    <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" placeholder="Ej: Palenque Municipal" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <textarea id="description" className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Descripción del evento..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" />Creando...</>) : "Crear Evento"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {events.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos</h3>
              <p className="text-muted-foreground mb-4">Crea tu primer evento para que aparezca en la página pública.</p>
              <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4" />Crear evento</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={event.status === "EN_PROGRESO" ? "success" : event.status === "FINALIZADO" ? "secondary" : event.status === "CANCELADO" ? "destructive" : "warning"}>
                      {event.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.location && (<div className="text-sm text-muted-foreground mb-2">📍 {event.location}</div>)}
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleDeleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}