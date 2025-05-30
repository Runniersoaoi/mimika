import { Loader, Heart, Users, Trophy, Zap, Smartphone, Brain } from "lucide-react"
import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link  from "next/link"
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-8 pt-16">
        <div className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] mb-8 lg:mb-0">
           <Image src="/mimika-logo.png" height={160} width={160} className="w-full h-full flex items-center justify-center text-white text-8xl lg:text-9xl" alt="Logo Mimika" />
        </div>
        <div className="flex flex-col items-center lg:items-start gap-y-6 max-w-[500px]">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-green-600">Mimika</span>
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-gray-700 mb-4">
              Rompe las barreras de comunicación con la comunidad sorda en Perú
            </p>
            <p className="text-lg text-gray-600">
              Conviértete en un agente de inclusión aprendiendo Lengua de Señas Peruana de manera práctica, visual e
              intuitiva.
            </p>
          </div>

          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                  <Button size="lg" className="w-full bg-green-600 text-white hover:bg-white hover:text-gray-800">
                    Comenzar Gratis
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                  <Button
                    size="lg"
                    variant="primaryOutline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Ya tengo una cuenta
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/learn">Continuar Aprendiendo</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>

      {/* Why Learn LSP Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">¿Por qué aprender LSP?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            En Perú, miles de personas sordas enfrentan barreras comunicativas debido al desconocimiento general de la
            Lengua de Señas Peruana (LSP). Esta aplicación ayuda a cerrar esa brecha, promoviendo la inclusión y
            mejorando la convivencia en espacios educativos y sociales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-800">Estadística Impactante</h3>
              </div>
              <p className="text-gray-700">
                &quot;La mayoría de estudiantes oyentes en universidades no conoce la LSP, lo que afecta la inclusión de sus
                compañeros sordos.&quot;
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">Ley Destacada</h3>
              </div>
              <p className="text-gray-700">
                Reconocimiento oficial de la LSP por la <strong>Ley 29535</strong>, que promueve la inclusión de las
                personas sordas en el Perú.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">¿Qué ofrece nuestra aplicación?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Repetición Espaciada</h3>
                <p className="text-gray-600">
                  Refuerza la memoria a largo plazo mediante algoritmos que presentan contenido justo antes de
                  olvidarlo.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Gamificación</h3>
                <p className="text-gray-600">
                  Transforma el aprendizaje en una experiencia divertida con puntos, niveles, insignias y recompensas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Interactividad</h3>
                <p className="text-gray-600">
                  Accesible desde cualquier dispositivo, con navegación intuitiva, multimedia y ejercicios visuales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Beneficios</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Retención</h3>
              <p className="text-gray-600">Mejora significativa en la memoria del vocabulario y frases básicas.</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-600">Accesibilidad</h3>
              <p className="text-gray-600">
                Uso desde cualquier dispositivo, interfaz amigable y navegación intuitiva.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-600">Motivación</h3>
              <p className="text-gray-600">Elementos de juego que fomentan el compromiso y la continuidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Testimonio</h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 italic mb-4">
                &quot;Gracias a esta app, pude aprender frases básicas en LSP en solo 2 semanas. Ahora me comunico mejor con
                mis compañeros sordos.&quot;
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Matias Aquino | Estudiante</p>
                  <p className="text-sm text-gray-600">Universidad Continental</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600">Pasos simples para comenzar:</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Regístrate gratis", desc: "Crea tu cuenta en segundos" },
              { step: "2", title: "Accede desde cualquier dispositivo", desc: "Móvil, tablet o computadora" },
              { step: "3", title: "Empieza con el alfabeto dactilológico", desc: "Aprende las bases de la LSP" },
              { step: "4", title: "Avanza con vocabulario y frases", desc: "Practica con ejercicios interactivos" },
              { step: "5", title: "Recibe retroalimentación", desc: "Desbloquea logros y mejora" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
