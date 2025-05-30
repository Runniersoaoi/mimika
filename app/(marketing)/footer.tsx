import { Separator } from "@/components/ui/separator"

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-lg">
                🤟
              </div>
              <h3 className="text-2xl font-bold text-green-400">Mimika</h3>
            </div>
            <p className="text-gray-300">
              Promoviendo la inclusión a través del aprendizaje de la Lengua de Señas Peruana.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Aprende</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Alfabeto Dactilológico</li>
              <li>Vocabulario Básico</li>
              <li>Frases Comunes</li>
              <li>Números y Colores</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Guía de LSP</li>
              <li>Comunidad</li>
              <li>Blog</li>
              <li>Soporte</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Ley 29535</li>
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Contacto</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Mimika. Todos los derechos reservados. Hecho con ❤️ para la comunidad sorda del Perú.</p>
        </div>
      </div>
    </footer>
  )
}
