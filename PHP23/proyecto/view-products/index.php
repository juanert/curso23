<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
  <?php include '../view/ui/navbar.php'; ?>
  <div class="p-4 mx-auto">
    <h1 class="text-2xl font-bold mb-4">Lista de Productos</h1>
    <!-- Tabla con scroll X -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200">ID</th>
            <th class="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th class="py-2 px-4 border-b border-gray-200">Descripción</th>
            <th class="py-2 px-4 border-b border-gray-200">Inventario</th>
            <th class="py-2 px-4 border-b border-gray-200">Precio</th>
            <th class="py-2 px-4 border-b border-gray-200">Fecha de Creación</th>
            <th class="py-2 px-4 border-b border-gray-200">Fecha de Actualización</th>
            <th class="py-2 px-4 border-b border-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php include '../model/show-products.php'; ?>
        </tbody>
      </table>
    </div>
</body>
</html>