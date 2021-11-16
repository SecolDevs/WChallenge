# Diseño de la Solución

Para el diseño de este proyecto se decidió realizar sobre TypeScript pensando principalmente en crear una solución robusta que permite tener un mejor control sobre los tipos de dato y la estructuración de la aplicación, permitiendo así una escalabilidad más eficiente y mejor mantenibilidad.

También se optó por usar un ORM tipado (TypeORM) lo que permite mejor mantenibilidad de las consultas SQL, ahorrándose el tiempo de escribir raw queries para realizar las diferentes acciones.

Para la base de datos se usó SQLite ya que permite tener la DB en un entorno centralizado, sin embargo, gracias al ORM se puede decidir migrar la DB a una solución más robusta a futuro sin ningún problema.
