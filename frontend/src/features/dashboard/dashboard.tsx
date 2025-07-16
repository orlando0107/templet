"use client";
import { Link } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-gray-600 text-lg animate-pulse">Cargando...</p>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-6 rounded-lg shadow-lg text-center">
					<h2 className="text-xl font-semibold text-red-600">Acceso denegado</h2>
					<Link href="auth/login" className="text-gray-700 mt-2">Debes iniciar sesión</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
					<p className="text-gray-700 mb-8">
						Bienvenido, <span className="font-semibold">{session?.user?.name}</span>
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Gestión de Biografía */}
						<div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
							<h3 className="text-lg font-semibold text-blue-900 mb-3">
								📝 Mi Biografía
							</h3>
							<p className="text-blue-700 text-sm mb-4">
								Comparte tu historia con el mundo. Crea, edita o elimina tu biografía personal.
							</p>
							<Link 
								href="/profile/biography" 
								className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
							>
								Gestionar Biografía
							</Link>
						</div>

						{/* Ejemplo de Productos */}
						<div className="bg-green-50 rounded-lg p-6 border border-green-200">
							<h3 className="text-lg font-semibold text-green-900 mb-3">
								🛍️ Productos
							</h3>
							<p className="text-green-700 text-sm mb-4">
								Explora nuestro catálogo de productos y lee las reseñas de otros usuarios.
							</p>
							<Link 
								href="/products" 
								className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
							>
								Ver Productos
							</Link>
						</div>

						{/* Ejemplo de Ayuda */}
						<div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
							<h3 className="text-lg font-semibold text-purple-900 mb-3">
								❓ Ayuda
							</h3>
							<p className="text-purple-700 text-sm mb-4">
								¿Necesitas ayuda? Encuentra respuestas a tus preguntas más frecuentes.
							</p>
							<Link 
								href="/help" 
								className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
							>
								Obtener Ayuda
							</Link>
						</div>

						{/* Ejemplo de Perfil */}
						<div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
							<h3 className="text-lg font-semibold text-orange-900 mb-3">
								👤 Mi Perfil
							</h3>
							<p className="text-orange-700 text-sm mb-4">
								Gestiona tu información personal y configuración de cuenta.
							</p>
							<Link 
								href="/profile" 
								className="inline-block bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
							>
								Ver Perfil
							</Link>
						</div>

						{/* Ejemplo de Configuración */}
						<div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								⚙️ Configuración
							</h3>
							<p className="text-gray-700 text-sm mb-4">
								Personaliza tu experiencia y ajusta las preferencias de tu cuenta.
							</p>
							<Link 
								href="/settings" 
								className="inline-block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
							>
								Configurar
							</Link>
						</div>

						{/* Ejemplo de Estadísticas */}
						<div className="bg-red-50 rounded-lg p-6 border border-red-200">
							<h3 className="text-lg font-semibold text-red-900 mb-3">
								📊 Estadísticas
							</h3>
							<p className="text-red-700 text-sm mb-4">
								Revisa tus estadísticas y actividad reciente en la plataforma.
							</p>
							<Link 
								href="/stats" 
								className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
							>
								Ver Estadísticas
							</Link>
						</div>
					</div>

					{/* Información del usuario */}
					<div className="mt-8 p-4 bg-gray-50 rounded-lg">
						<h3 className="text-lg font-semibold text-gray-900 mb-3">
							Información de la cuenta
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-gray-700">Email:</span>{" "}
								<span className="text-gray-600">{session?.user?.email}</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">Rol:</span>{" "}
								<span className="text-gray-600 capitalize">{session?.user?.role || "Usuario"}</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">Estado:</span>{" "}
								<span className="text-green-600 font-medium">Activo</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">Último acceso:</span>{" "}
								<span className="text-gray-600">{new Date().toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
