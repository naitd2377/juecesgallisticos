"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Calendar,
  Plus,
  LogOut,
  Trophy,
  MapPin,
  Loader2,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

interface EventItem {
  id: string;
  name: string;
  date: string;
  location: string | null;
  description: string | null;
  status: string;
}

export default function EventosPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchEvents(token);
  }, [router]);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    }
    return token;
  };

  const fetchEvents = async (token: string) => {
    try {
      const res = await fetch("/api/eventos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast.error("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    if (!name || !date) {
      toast.error("Nombre y fecha son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          date: new Date(date).toISOString(),
          location: location || null,
          description: description || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al crear evento");
        return;
      }

      toast.success("Evento creado exitosamente");
      setName("");
      setDate("");
      setLocation("");
      setDescription("");
      setShowForm(false);
      fetchEvents(token);
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`/api/eventos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Error al eliminar evento");
        return;
      }

      toast.success("Evento eliminado");
      fetchEvents(token);
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Jueces Gallísticos</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/panel">
            <ChevronLeft className="h-4 w-4" />
            Volver al panel
          </Link>
        </Button>

        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestión de Eventos</h1>
            <p className="text-muted-foreground">
              Crea y administra tus eventos gallísticos
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />
            {showForm ? "Cancelar" : "Nuevo Evento"}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Crear Nuevo Evento</CardTitle>
              <CardDescription>
                Completa la información del evento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del evento *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Torneo Regional 2024"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha y hora *</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    placeholder="Ej: Palenque de Gallos, Ciudad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Descripción del evento..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear Evento"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Events List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Cargando eventos...
            </CardContent>
          </Card>
        ) : events.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos</h3>
              <p className="text-muted-foreground mb-4">
                Crea tu primer evento para comenzar.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4" />
                Crear evento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                      variant={
                        event.status === "EN_PROGRESO"
                          ? "success"
                          : event.status === "FINALIZADO"
                          ? "secondary"
                          : event.status === "CANCELADO"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {event.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.location && (
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/panel/eventos/${event.id}`}>
                        Ver peleas
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Jueces Gallísticos
        </div>
      </footer>
    </div>
  );
}
