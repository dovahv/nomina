class CreateRegistros < ActiveRecord::Migration
  def change
    create_table :registros do |t|
      t.string :elemento
      t.integer :clase
      t.references :usuario, index: true, foreign_key: true, default: 1
      t.integer :tipo_de_accion

      t.timestamps null: false
    end
  end
end
