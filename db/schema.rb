# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160705180652) do

  create_table "cargos", force: :cascade do |t|
    t.string   "nombre",          limit: 255
    t.integer  "departamento_id", limit: 4
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.integer  "tipo_id",         limit: 4
    t.boolean  "disponible",                  default: true
  end

  add_index "cargos", ["departamento_id"], name: "index_cargos_on_departamento_id", using: :btree
  add_index "cargos", ["tipo_id"], name: "index_cargos_on_tipo_id", using: :btree

  create_table "conceptos", force: :cascade do |t|
    t.string   "nombre",            limit: 255
    t.integer  "modalidad_de_pago", limit: 4
    t.integer  "condicion",         limit: 4
    t.date     "fecha_fin"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "tipo_de_concepto",  limit: 4
  end

  create_table "conceptos_tipos", id: false, force: :cascade do |t|
    t.integer "tipo_id",     limit: 4, null: false
    t.integer "concepto_id", limit: 4, null: false
  end

  create_table "conceptospersonales", force: :cascade do |t|
    t.string   "nombre",           limit: 255
    t.integer  "tipo_de_concepto", limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "contratos", force: :cascade do |t|
    t.date     "fecha_inicio"
    t.date     "fecha_fin"
    t.integer  "tipo_de_contrato", limit: 4
    t.decimal  "sueldo_externo",             precision: 10
    t.integer  "persona_id",       limit: 4
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "contratos", ["persona_id"], name: "index_contratos_on_persona_id", using: :btree

  create_table "departamentos", force: :cascade do |t|
    t.string   "nombre",         limit: 255
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "dependencia_id", limit: 4
  end

  add_index "departamentos", ["dependencia_id"], name: "index_departamentos_on_dependencia_id", using: :btree

  create_table "dependencias", force: :cascade do |t|
    t.string   "nombre",     limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "familiares", force: :cascade do |t|
    t.integer  "tipo_de_cedula",      limit: 4
    t.integer  "cedula",              limit: 4
    t.string   "nombres",             limit: 255
    t.string   "parentesco",          limit: 255
    t.string   "apellidos",           limit: 255
    t.date     "fecha_de_nacimiento"
    t.integer  "sexo",                limit: 4
    t.string   "direccion",           limit: 255
    t.integer  "persona_id",          limit: 4
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "familiares", ["persona_id"], name: "index_familiares_on_persona_id", using: :btree

  create_table "formulas", force: :cascade do |t|
    t.integer  "concepto_id", limit: 4
    t.string   "empleado",    limit: 255
    t.string   "patrono",     limit: 255
    t.boolean  "activo",                  default: true
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  add_index "formulas", ["concepto_id"], name: "index_formulas_on_concepto_id", using: :btree

  create_table "formulaspersonales", force: :cascade do |t|
    t.string   "empleado",            limit: 255
    t.string   "patrono",             limit: 255
    t.boolean  "activo",                          default: true
    t.integer  "registroconcepto_id", limit: 4
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
  end

  add_index "formulaspersonales", ["registroconcepto_id"], name: "index_formulaspersonales_on_registroconcepto_id", using: :btree

  create_table "historiales", force: :cascade do |t|
    t.integer  "persona_id",   limit: 4
    t.integer  "cargo_id",     limit: 4
    t.date     "fecha_inicio"
    t.date     "fecha_fin"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "historiales", ["cargo_id"], name: "index_historiales_on_cargo_id", using: :btree
  add_index "historiales", ["persona_id"], name: "index_historiales_on_persona_id", using: :btree

  create_table "personas", force: :cascade do |t|
    t.string   "cedula",              limit: 255
    t.integer  "tipo_de_cedula",      limit: 4
    t.string   "nombres",             limit: 255
    t.string   "apellidos",           limit: 255
    t.string   "telefono_fijo",       limit: 255
    t.string   "telefono_movil",      limit: 255
    t.date     "fecha_de_nacimiento"
    t.string   "correo",              limit: 255
    t.string   "direccion",           limit: 255
    t.integer  "sexo",                limit: 4
    t.string   "status",              limit: 255, default: "activo"
    t.date     "fecha_envio"
    t.integer  "cargo_id",            limit: 4
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "avatar_file_name",    limit: 255
    t.string   "avatar_content_type", limit: 255
    t.integer  "avatar_file_size",    limit: 4
    t.datetime "avatar_updated_at"
    t.string   "cuenta",              limit: 255
    t.boolean  "FAOV"
    t.boolean  "IVSS"
    t.boolean  "TSS"
    t.boolean  "caja_de_ahorro"
  end

  add_index "personas", ["cargo_id"], name: "index_personas_on_cargo_id", using: :btree

  create_table "personas_requisitos", id: false, force: :cascade do |t|
    t.integer "requisito_id", limit: 4, null: false
    t.integer "persona_id",   limit: 4, null: false
  end

  create_table "registros", force: :cascade do |t|
    t.integer  "elemento",       limit: 4
    t.text     "cambios",        limit: 65535
    t.integer  "clase",          limit: 4
    t.integer  "usuario_id",     limit: 4,     default: 1
    t.integer  "tipo_de_accion", limit: 4
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "registros", ["usuario_id"], name: "index_registros_on_usuario_id", using: :btree

  create_table "registrosconceptos", force: :cascade do |t|
    t.integer  "conceptopersonal_id", limit: 4
    t.integer  "modalidad_de_pago",   limit: 4
    t.integer  "persona_id",          limit: 4
    t.date     "fecha_fin"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "requisitos", force: :cascade do |t|
    t.string   "nombre",     limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.integer  "resource_id",   limit: 4
    t.string   "resource_type", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "settings", force: :cascade do |t|
    t.string   "var",        limit: 255,   null: false
    t.text     "value",      limit: 65535
    t.integer  "thing_id",   limit: 4
    t.string   "thing_type", limit: 30
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "settings", ["thing_type", "thing_id", "var"], name: "index_settings_on_thing_type_and_thing_id_and_var", unique: true, using: :btree

  create_table "sueldos", force: :cascade do |t|
    t.float    "monto",           limit: 24
    t.boolean  "activo",                     default: true
    t.integer  "cargo_id",        limit: 4
    t.float    "sueldo_integral", limit: 24
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "sueldos", ["cargo_id"], name: "index_sueldos_on_cargo_id", using: :btree

  create_table "tipos", force: :cascade do |t|
    t.string   "nombre",     limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "usuarios", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "usuarios", ["email"], name: "index_usuarios_on_email", unique: true, using: :btree
  add_index "usuarios", ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true, using: :btree

  create_table "usuarios_roles", id: false, force: :cascade do |t|
    t.integer "usuario_id", limit: 4
    t.integer "role_id",    limit: 4
  end

  add_index "usuarios_roles", ["usuario_id", "role_id"], name: "index_usuarios_roles_on_usuario_id_and_role_id", using: :btree

  add_foreign_key "cargos", "departamentos"
  add_foreign_key "cargos", "tipos"
  add_foreign_key "contratos", "personas"
  add_foreign_key "departamentos", "dependencias"
  add_foreign_key "familiares", "personas"
  add_foreign_key "formulas", "conceptos"
  add_foreign_key "formulaspersonales", "registrosconceptos"
  add_foreign_key "historiales", "cargos"
  add_foreign_key "historiales", "personas"
  add_foreign_key "personas", "cargos"
  add_foreign_key "registros", "usuarios"
  add_foreign_key "sueldos", "cargos"
end
