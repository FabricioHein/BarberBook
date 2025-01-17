import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/repositories/task.repository';

import { DateTime } from 'src/helper/data.helper';

import { AnotacaoRepository } from 'src/repositories/anotacoes.repository';
import { ArquivosRepository } from 'src/repositories/arquivos.repository';
import { MotivosRepository } from 'src/repositories/motivos.repository';
import { LogTasksRepository } from 'src/repositories/logTask.repositoy';
import { ErroBadRequest } from 'src/utils/msg.response';
@Injectable()
export class TaskService {
  constructor(
    private anotacaoRepository: AnotacaoRepository,
    private taskRepositorio: TaskRepository,
    private arquivosRepository: ArquivosRepository,
    private motivosRepository: MotivosRepository,
    private logTasksRepository: LogTasksRepository,
  ) {}
  async historicoTask(data) {
    return await this.logTasksRepository.createLogTasks(data);
  }
  async getByIdMotivos(id) {
    try {
      return await this.anotacaoRepository.getAnotacaoAll(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getAllMotivos(id) {
    try {
      return await this.motivosRepository.getMotivosAll(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async createMotivos(data: any) {
    try {
      return await this.motivosRepository.createMotivos(data);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }

  async deleteMotivos(data: any) {
    try {
      const id = data.id;
      return await this.motivosRepository.deleteMotivos(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async atualizarMotivos(data: any) {
    try {
      const { id } = data;
      const dataTask = data;

      return await this.motivosRepository.updateMotivos(id, dataTask);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async atualizarTask(data: any) {
    try {
      const { id } = data;
      const dataTask = data;

      return await this.taskRepositorio.updateTask(id, dataTask);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async atualizarAnotacao(data: any) {
    try {
      const { id } = data;
      const dataAnotacao = data;

      return await this.anotacaoRepository.updateAnotacao(
        id,
        dataAnotacao,
      );
    } catch (error) {
      return ErroBadRequest(error);
    }
  }

  async getByIdTask(id) {
    try {
      const task = await this.taskRepositorio.getByIdTask(id);
      task.previsao_fechamento = DateTime.ToFormat(
        task.previsao_fechamento,
        'YYYY-MM-DD',
      );

      return task;
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getAllTask() {
    try {
      return await this.taskRepositorio.getTaskAll();
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async createTask(data: any) {
    try {
      return await this.taskRepositorio.createTask(data);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getTaskAnexos(data: any) {
    try {
      return await this.arquivosRepository.createArquivos(data);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async deleteTask(data: any) {
    try {
      const id = data.id;
      return await this.taskRepositorio.deleteTask(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async deleteTaskAnexos(data: any) {
    try {
      const id = data.id;
      return await this.arquivosRepository.deleteArquivos(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getAnotacaoAllId(id) {
    try {
      return await this.anotacaoRepository.getAnotacaoAll(Number(id));
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async deleteAnotacao(data: any) {
    try {
      const id = data.id;
      return await this.anotacaoRepository.deleteAnotacao(id);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getAllAnotacao(taskId) {
    try {
      return await this.anotacaoRepository.getAnotacaoAll(taskId);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async createAnotacao(data: any) {
    try {
      return await this.anotacaoRepository.createAnotacao(data);
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getVisaoGeralTaskSub(data: any, clientId) {
    try {
      const filter = {
        task: {
          processo: {
            projeto: {
              empresa_configId: Number(clientId),
            },
          },
        },
        AND: [],
      };
      console.log(data);
      if (data.dataInicio && !data.dataFinal) {
        filter.AND.push({
          date_start: new Date(data.dataInicio),
        });
      }
      if (!data.dataInicio && data.dataFinal) {
        filter.AND.push({
          date_end: new Date(data.dataFinal),
        });
      }
      if (data.dataInicio && data.dataFinal) {
        let dataArr = DateTime.getListadeData(data.dataFinal, data.dataFinal);
        console.log(dataArr);
      }
      if (data.status) {
        filter.AND.push({
          status: data.status,
        });
      }

      // const filtro = await this.taskRepositorio.getTaskAll(filter);

      // return filtro.map((f) => {
      //   return {
      //     date_end: DateTime.DateToString(f.date_end),
      //     date_start: DateTime.DateToString(f.date_start),
      //     status: f.status,
      //     title: f.title,
      //     priority: f.priority,
      //     id: f.id,
      //     name: f.task.title,
      //     taskId: f.task.id,
      //   };
      // });
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
  async getVisaoGeralTask(data: any, clientId) {
    try {
      const filter = {
        processo: {
          projeto: {
            empresa_configId: Number(clientId),
          },
        },
        AND: [],
      };

      if (data.temperatura) {
        filter.AND.push({
          status: data.temperatura,
        });
      }
      if (data.projeto) {
        filter.AND.push({
          processo: {
            projeto: {
              id: Number(data.projeto),
            },
          },
        });
      }
      if (data.previsao) {
        filter.AND.push({
          previsao_fechamento: new Date(data.previsao),
        });
      }
      if (data.motivos) {
        filter.AND.push({
          motivosId: Number(data.motivos),
        });
      }
      if (data.vendedor) {
        filter.AND.push({
          usersId: Number(data.vendedor),
        });
      }
      if (data.vendedor) {
        filter.AND.push({
          usersId: Number(data.vendedor),
        });
      }
      if (data.produto) {
        filter.AND.push({
          produtoId: Number(data.produto),
        });
      }

      const visaoGeralTask = await this.taskRepositorio.getVisaoGeralTask(
        filter,
      );

      return visaoGeralTask;
    } catch (error) {
      return ErroBadRequest(error);
    }
  }
}
