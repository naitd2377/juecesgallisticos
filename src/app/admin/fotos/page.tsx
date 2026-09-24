"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Loader2, LogOut, Upload, ArrowLeft, Trash2, Camera } from "lucide-react";
import { toast } from "sonner";

interface Foto { id: string; url: string; title: string; eventName: string | null; createdAt: string; }

export default function AdminFotosPage() {
  const router = useRouter();
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [eventName, setEventName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin"); return; }
    fetchFotos();
  }, [router]);

  const fetchFotos = async () => {
    try {
      const res = await fetch("/api/fotos");
      const data = await res.json();
      setFotos(data);
    } catch { toast.error("Error al cargar fotos"); }
    finally { setLoading(false); }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) { toast.error("Foto y título son requeridos"); return; }
    
    // Validar tamaño (máximo 4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("La foto es muy grande. Máximo 4MB.");
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin"); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("eventName", eventName);

      const res = await fetch("/api/fotos", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Error"); return; }
      
      toast.success("Foto subida correctamente");
      setTitle(""); setEventName(""); setFile(null);
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      fetchFotos();
    } catch { toast.error("Error de conexión"); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("¿Eliminar esta foto?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`/api/fotos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { toast.error("Error"); return; }
      toast.success("Foto eliminada");
      fetchFotos();
    } catch { toast.error("Error"); }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Panel Admin - Fotos</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin"><ArrowLeft className="h-4 w-4" />Eventos</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Gestión de Galería</h1>
          <p className="text-sm text-muted-foreground">Sube fotos de eventos para mostrarlas en la página /galeria</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subir Nueva Foto</CardTitle>
            <CardDescription>Las fotos se mostrarán en la galería pública</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la foto *</Label>
                  <Input id="title" placeholder="Ej: Torneo Regional 2024" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventName">Nombre del evento (opcional)</Label>
                  <Input id="eventName" placeholder="Ej: Palenque Municipal" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Seleccionar foto *</Label>
                <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                <p className="text-xs text-muted-foreground">Formatos: JPG, PNG, WebP. Máximo 4MB.</p>
              </div>
              <Button type="submit" disabled={uploading}>
                {uploading ? (<><Loader2 className="h-4 w-4 animate-spin" />Subiendo...</>) : (<><Upload className="h-4 w-4" />Subir Foto</>)}
              </Button>
            </form>
          </CardContent>
        </Card>

        <h2 className="text-xl font-bold mb-4">Fotos Subidas ({fotos.length})</h2>
        {fotos.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay fotos</h3>
              <p className="text-muted-foreground">Sube tu primera foto usando el formulario de arriba.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotos.map((foto) => (
              <Card key={foto.id} className="overflow-hidden">
                <div className="aspect-square bg-secondary relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto.url} alt={foto.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{foto.title}</p>
                  {foto.eventName && (<p className="text-xs text-muted-foreground truncate">{foto.eventName}</p>)}
                  <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => handleDelete(foto.id, foto.url)}>
                    <Trash2 className="h-3 w-3 text-destructive" />Eliminar
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