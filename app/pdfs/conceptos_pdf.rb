class ConceptosPdf < Prawn::Document
  def initialize(tipo, eco, con, conper)
    super(left_margin: 20, top_margin: 30, right_margin: 20)
    # Tipo.first.conceptos.last.tipos.last.cargos.last.persona
    banner = 'app/assets/images/banner.png'
    if eco == 1
      font 'public/fonts/eco.ttf'
      banner = 'app/assets/images/banner_bn.png'
    end
    conceptos = tipo.conceptos

    conceptos.each do |concepto|
      tipos = concepto.tipos

      conceptoExtra = concepto
      next if con == '0'
      conceptoExtra = Concepto.find(con) if con && con != ''

      next unless conceptoExtra.id == concepto.id
      acu_aporte_e = 0
      acu_aporte_p = 0
      pc = 0
      data = [%w(C.I NOMBRES APORTE\ EMPLEADO APORTE\ EMPLEADOR TOTAL)]

      tipos.each do |tipoo|
        next unless tipo.id == tipoo.id
        cargos = tipo.cargos

        cargos.each do |cargo|
          next unless cargo.disponible == false
          p = cargo.persona
          if con != ''
            p.calculo true
          else

            p.calculo false
          end
          next unless (p.contrato.tipo_de_contrato != 2) || (p.total > 0 && p.contrato.tipo_de_contrato == 2)
          next unless p.valido == true
          next unless p.status != 'retirado'
          cc = [p.asignaciones, p.deducciones]
          cc.each do |ccc|
            ccc.each do |c|
              next unless c['nombre'] == concepto.nombre && c['clase_de_concepto'] == 0
              pc += 1
              if p.status == 'activo'
                acu_aporte_e += c['valor'].to_d
                acu_aporte_p += c['valor_patrono'].to_d
                data += [[p.cedula.to_s, "#{p.nombres} #{p.apellidos}", c['valor'], c['valor_patrono'], (c['valor'].to_d + c['valor_patrono'].to_d).to_s]]
              else
                data += [[p.cedula.to_s, "#{p.nombres} #{p.apellidos}", '0.0', '0.0', '0.0']]
              end
            end
          end
        end
      end
      next unless pc > 0
      image banner, scale: 0.48, at: [62, 720]
      move_down 120
      text 'LISTADO DE CONCEPTOS ', align: :center, size: 16, leading: 2
      text $dic['quincena'].key($quincena).upcase + 'DE ' + $dic['meses'].key($ahora.month) + $ahora.strftime(' DE %Y'), align: :center, size: 16, leading: 2
      text 'NÓMINA PERSONAL ' + tipo.nombre.upcase, align: :center, size: 16, leading: 2
      text concepto.nombre, size: 16, align: :center, leading: 2
      move_down 10
      data += [['TOTAL', concepto.nombre, acu_aporte_e.to_s, acu_aporte_p.to_s, (acu_aporte_p + acu_aporte_e).to_s]]
      table data, header: true, cell_style: { size: 8 }, width: 570
      start_new_page
    end
    conceptosp = Conceptopersonal.all

    conceptosp.each do |conceptop|
      registros = conceptop.registrosconceptos
      conceptoExtra = conceptop
      next if conper == '0'
      conceptoExtra = Conceptopersonal.find(conper) if conper != ''
      acu_aporte_e = 0
      acu_aporte_p = 0
      pc = 0
      data = [%w(C.I NOMBRES APORTE\ EMPLEADO APORTE\ EMPLEADOR TOTAL)]
      registros.each do |registro|
        p = registro.persona
        if conper != ''
          p.calculo true
        else
          p.calculo false
        end
        next unless p.valido == true
        cc = [p.asignaciones, p.deducciones]
        cc.each do |ccc|
          ccc.each do |c|
            next unless c['nombre'].casecmp(conceptop.nombre.upcase).zero? && c['clase_de_concepto'] == 1
            pc += 1
            if p.status == 'activo'
              acu_aporte_e += c['valor'].to_d
              acu_aporte_p += c['valor_patrono'].to_d
              data += [[p.cedula.to_s, "#{p.nombres} #{p.apellidos}", c['valor'], c['valor_patrono'], (c['valor'].to_d + c['valor_patrono'].to_d).to_s]]
            else
              data += [[p.cedula.to_s, "#{p.nombres} #{p.apellidos}", '0.0', '0.0', '0.0']]
            end
          end
        end
      end
      next unless pc > 0
      image banner, scale: 0.48, at: [62, 720]
      move_down 120
      text 'LISTADO DE CONCEPTOS ', align: :center, size: 16, leading: 2
      text $dic['quincena'].key($quincena).upcase + 'DE ' + $dic['meses'].key($ahora.month) + $ahora.strftime(' DE %Y'), align: :center, size: 16, leading: 2
      text 'NÓMINA PERSONAL ' + tipo.nombre.upcase, align: :center, size: 16, leading: 2
      text conceptop.nombre, size: 16, align: :center, leading: 2
      move_down 10
      data += [['TOTAL', conceptop.nombre, acu_aporte_e.to_s, acu_aporte_p.to_s, (acu_aporte_p + acu_aporte_e).to_s]]
      table data, header: true, cell_style: { size: 8 }
      start_new_page
    end
  end
end
