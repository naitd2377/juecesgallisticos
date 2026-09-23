"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  Users,
  BarChart3,
  LogOut,
  Plus,
  Settings,
  Activity,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EventItem {
  id: string;
  name: string;
  date: string;
  location: string | null;
  status: string;
  _count?: { fights: number };
}

export default function PanelPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userStr));
    fetchEvents(token);
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Sesión cerrada");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  const stats = [
    {
      label: "Eventos Totales",
      value: events.length,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Eventos Activos",
      value: events.filter((e) => e.status === "EN_PROGRESO").length,
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Programados",
      value: events.filter((e) => e.status === "PROGRAMADO").length,
      icon: Trophy,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Finalizados",
      value: events.filter((e) => e.status === "FINALIZADO").length,
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Jueces Gallísticos</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Hola, {user.name} 👋
          </h1>
          <p className="text-muted-foreground">
            Bienvenido a tu panel de control. Aquí puedes gestionar tus eventos y calificaciones.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Events Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Eventos Recientes</h2>
            <p className="text-sm text-muted-foreground">
              Gestiona tus eventos gallísticos
            </p>
          </div>
          <Button asChild>
            <Link href="/panel/eventos">
              <Plus className="h-4 w-4" />
              Ver Eventos
            </Link>
          </Button>
        </div>

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
              <h3 className="text-lg font-semibold mb-2">No hay eventos aún</h3>
              <p className="text-muted-foreground mb-4">
                Crea tu primer evento para comenzar a calificar peleas.
              </p>
              <Button asChild>
                <Link href="/panel/eventos">
                  <Plus className="h-4 w-4" />
                  Crear primer evento
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => (
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
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {event.location && (
                    <div className="text-sm text-muted-foreground mb-2">
                      📍 {event.location}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mb-4">
                    {event._count?.fights || 0} peleas registradas
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/panel/eventos/${event.id}`}>
                      Ver detalles
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
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
