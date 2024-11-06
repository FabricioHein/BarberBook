import { PrismaService } from 'src/base/relacional/PrismaService';
import AgendaRetornoModel from 'src/infra/DTO/agenda-dto';
import { addMinutes, format, isBefore, isAfter, isToday, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AgendaRepository {
  constructor(private prisma: PrismaService) { }


  async getHorariosDisponiveis(barbeiroId: number, dia: Date, uuid: string) {
    const diaDate = new Date(dia);
    const agora = new Date(); // Data e hora atuais

    // Definir horário de trabalho padrão (08:00 às 18:00)
    let horarioInicio = new Date(diaDate);
    horarioInicio.setHours(8, 0, 0, 0); // 08:00

    const horarioFim = new Date(diaDate);
    horarioFim.setHours(22, 0, 0, 0); // 18:00

    // Se a data for hoje, ajustamos o início para o horário atual arredondado para o próximo intervalo de 30 minutos
    if (isToday(diaDate)) {
      // Se o horário atual for antes de 18:00, arredondar para o próximo intervalo de 30 minutos
      if (isBefore(agora, horarioFim)) {
        const minutos = agora.getMinutes();
        const arredondarMinutos = minutos < 30 ? 30 : 60; // Se os minutos forem menores que 30, arredondar para 30, senão para 0 da próxima hora
        horarioInicio = setMinutes(agora, arredondarMinutos); // Define os minutos arredondados
        horarioInicio = setSeconds(horarioInicio, 0); // Zera os segundos
        horarioInicio = setMilliseconds(horarioInicio, 0); // Zera os milissegundos

        // Se o horário final dos minutos for 60 (exemplo: 13:45 arredonda para 14:00)
        if (horarioInicio.getMinutes() === 60) {
          horarioInicio = addMinutes(horarioInicio, -60); // Volta os minutos para 0 e avança a hora
          horarioInicio.setHours(horarioInicio.getHours() + 1);
        }
      }
    }

    // Buscar as agendas relacionadas à empresa
    const userAgendas = await this.prisma.agenda.findMany({
      where: {
        Users: {
          some: {
            id: Number(barbeiroId)
          }
        },
        AND: [
          {
            date_start: {
              gte: horarioInicio // Início do dia de trabalho (ajustado se for o dia de hoje)
            }
          },
          {
            date_end: {
              lte: horarioFim // Fim do dia de trabalho
            }
          }
        ]
      }
    });

    // Formatar as agendas com horários ocupados
    const horariosOcupados = userAgendas.map(agenda => ({
      inicio: new Date(agenda.date_start),
      fim: new Date(agenda.date_end)
    }));

    // Função para verificar se um intervalo está ocupado
    const estaOcupado = (inicio: Date, fim: Date) => {
      return horariosOcupados.some(ocupado => {
        // Verifica se o intervalo "inicio -> fim" está completamente dentro de um horário ocupado
        return (isBefore(inicio, ocupado.fim) && isAfter(fim, ocupado.inicio));
      });
    };

    // Gerar os intervalos de 30 minutos e coletar horários disponíveis
    const horariosDisponiveis: string[] = [];
    let intervaloAtual = new Date(horarioInicio);

    // Continue gerando intervalos enquanto o horário atual é antes do horário de fim
    while (isBefore(intervaloAtual, horarioFim)) {
      const proximoIntervalo = addMinutes(intervaloAtual, 30);

      // Verificar se o intervalo atual está ocupado
      if (!estaOcupado(intervaloAtual, proximoIntervalo)) {
        // Adicionar o horário no formato 'HH:mm' à lista de horários disponíveis
        horariosDisponiveis.push(format(intervaloAtual, 'HH:mm'));
      }

      // Avançar para o próximo intervalo de 30 minutos
      intervaloAtual = proximoIntervalo;
    }

    return horariosDisponiveis;
  }

  async getAgendaByDataUsuario(atendimentoId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    console.log(atendimentoId, startOfDay, endOfDay)


    const userAgendas = await this.prisma.agenda.findMany({
      where: {
        AND: [
          {
            date_start: {
              gte: startOfDay,
              lte: endOfDay
            }
          },
          {
            Users: {
              some: {
                id: atendimentoId
              }
            }
          }
        ]
      },
      include: {
        Users: true
      }
    });

    // Formatar as agendas usando AgendaModel
    const formattedAgendas = userAgendas.map(agendaData => {
      const formattedData = new AgendaRetornoModel({
        ...agendaData,
        date_start: new Date(agendaData.date_start),
        date_end: new Date(agendaData.date_end),
        Users: agendaData.Users,
        agenda_cliente: (agendaData as any).agenda_cliente || []

      });
      return formattedData;
    });

    return formattedAgendas;

  };

  async getDataAgendamento(uuid) {
    const userAgendas = await this.prisma.agenda.findMany({
      where: {
        Users: {
          some: {
            Users: {
              empresa_config: {
                uuid: uuid
              }
            }
          }
        }
      },
      include: {
        Users: true
      }
    });

    // Formatar as agendas usando AgendaModel
    const formattedAgendas = userAgendas.map(agendaData => {
      const formattedData = new AgendaRetornoModel({
        ...agendaData,
        date_start: new Date(agendaData.date_start),
        date_end: new Date(agendaData.date_end),
        Users: agendaData.Users,
        agenda_cliente: (agendaData as any).agenda_cliente || []

      });
      return formattedData;
    });

    return formattedAgendas;

  }
  async getAgendaAllEmpresa(empresa_configId) {
    const userAgendas = await this.prisma.agenda.findMany({
      where: {
        Users: {
          some: {
            Users: {
              empresa_configId: empresa_configId
            }
          }
        }
      },
      include: {
        Users: true
      }
    });

    // Formatar as agendas usando AgendaModel
    const formattedAgendas = userAgendas.map(agendaData => {
      const formattedData = new AgendaRetornoModel({
        ...agendaData,
        date_start: new Date(agendaData.date_start),
        date_end: new Date(agendaData.date_end),
        Users: agendaData.Users,
        agenda_cliente: (agendaData as any).agenda_cliente || []

      });
      return formattedData;
    });

    return formattedAgendas;

  }

  async getAgendaAll(empresa_configId) {
    const userAgendas = await this.prisma.agenda.findMany({
      where: {
        Users: {
          some: {
            Users: {
              empresa_configId: empresa_configId
            }
          }
        }
      },

      include: {
        Users: {
          select: {
            userId: true
          }
        },
        agenda_cliente: {
          select: {
            clienteId: true
          }
        }
      }
    });

    // Formatar as agendas usando AgendaModel
    const formattedAgendas = userAgendas.map(agendaData => {
      const formattedData = new AgendaRetornoModel({
        ...agendaData,
        date_start: new Date(agendaData.date_start),
        date_end: new Date(agendaData.date_end),
        Users: agendaData.Users,
        agenda_cliente: (agendaData as any).agenda_cliente || []

      });
      return formattedData;
    });

    return formattedAgendas;

  }
  async getByIdAgenda(id) {
    return await this.prisma.agenda.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createAgenda(data) {
    // Cria os parâmetros básicos da agenda
    let params = {
      title: data.title,
      description: data.description,
      className: data.className,
      status: data.status,
      date_start: data.date_start,
      date_end: data.date_end
    };

    // Verifica se há taskId e o adiciona aos parâmetros
    if (data.taskId) {
      params['taskId'] = data.taskId;
    }

    // Cria a nova agenda
    const newAgenda = await this.prisma.agenda.create({
      data: params
    });

    // Conectar clientes à agenda (usando a tabela agenda_cliente)
    if (data.clienteIds && data.clienteIds.length > 0) {
      const validClienteIds = await this.prisma.cliente.findMany({
        where: {
          id: { in: data.clienteIds }
        },
        select: {
          id: true
        }
      });

      await Promise.all(
        validClienteIds.map(async (cliente) => {
          await this.prisma.agenda_cliente.create({
            data: {
              agendaId: newAgenda.id,
              clienteId: cliente.id
            },
          });
        })
      );
    }

    // Conectar usuários à agenda (usando a tabela agenda_usuario_cliente)
    if (data.userIds && data.userIds.length > 0) {
      await Promise.all(
        data.userIds.map(async (userId) => {
          await this.prisma.agenda_usuario.create({
            data: {
              agendaId: newAgenda.id,
              userId: userId
            },
          });
        })
      );
    }

    return newAgenda;
  }

  async updateAgenda(id, data) {


    let params = {
      title: data.title,
      description: data.description,
      className: data.className,
      status: data.status,
      date_start: data.date_start,
      date_end: data.date_end
    };

    if (data.taskId) {
      params['taskId'];
    };

    const updatedAgenda = await this.prisma.agenda.update({
      where: { id: id },
      data: {
        ...params,
        Users: {
          deleteMany: {
            agendaId: id
          },
          create: data.userIds.map(userId => ({
            Users: {
              connect: { id: userId }
            }
          }))
        }
      },
      include: {
        Users: true
      }
    });

    return updatedAgenda;
  }

  async deleteAgenda(id) {
    await this.prisma.agenda.update({
      where: { id: id },
      data: {
        Users: {
          deleteMany: {
            agendaId: id
          }
        }
      }
    });

    return await this.prisma.agenda.delete({
      where: {
        id: id,
      },
    });
  }

  async createManyAgenda(data) {
    return await this.prisma.agenda.createMany({
      data: data,
    });
  }
  async deleteManyTaskSubSub(id) {
    return await this.prisma.agenda.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
