import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { DataTicketService } from '../../services/data-ticket/data-ticket.service';

@Component({
  selector: 'ngx-graph-org-tree',
  templateUrl: './ngx-graph-org-tree.component.html',
  styleUrls: ['./ngx-graph-org-tree.component.scss']
})
export class NgxGraphOrgTreeComponent implements OnInit {

  // Listas que almacenarán los usuarios y categorías que vienen del API
  users: any[];
  categorias: any[];

  // Contadores que tendrán la función de identificadores de Nodos(cards) y links(flechas)
  countNodes: number = 1;
  countLinks: number = 1;
  upperId: number = 0;

  // Servirá para visualizar un nuevo nodo cadevez que agregamos uno a la lista
  update$: Subject<any> = new Subject();

  // lista de nodos definida con el nodo inicial
  public nodes: any[] = [{
    id: this.countNodes.toString(),
    label: "Inicial",
    data: {}
  }];

  // Lista de links vacia
  public links: Edge[] = [];


  // Configuraciones del gráfico
  public layoutSettings = {
    orientation: 'LR'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  // Se Inyeccta el servicio 
  constructor(public _getDataService: DataTicketService) { }

  ngOnInit() {

    // Se actualiza la data del nodo inicial con la data del Ticket Inicial del API
    this._getDataService.getTicketInicial().subscribe((resp: any) => {
      this.nodes[0].data = resp.data;
    });

    // Se obtiene la lista de usuarios provenientes del API y se agregan a la lista 
    this._getDataService.getUsuarios().subscribe((resp: any) => {
      this.users = resp.usuarios;
    });

    // Se obtiene la lista de categorías provenientes del API y se agregan a la lista 
    this._getDataService.getCategorias().subscribe((resp: any) => {
      this.categorias = resp.categorias;
    });
  }


  // Agrega el Nodo para aactualizar
  addNodeActualizar() {

    // Debido a que si el usuario elige actualizar, sólo se mostrará 2 nodos. Para eso,
    // se confirma de que la lista de nodos no tenga más de 2
    if (this.nodes.length <= 1) {

      // Se llama al servicio, para obtener la data
      this._getDataService.getTicketActualizar().subscribe((resp: any) => {

        // Se aumenta los identificadores en 1
        this.countNodes += 1;
        this.countLinks += 1;

        // Se agreta a la lista de nodos, uno nuevo con la data del API
        this.nodes.push({
          id: this.countNodes.toString(),
          label: "Actualizar",
          upperId: '1',
          data: resp.data
        })

        // Se agrega el link
        this.links.push({
          source: '1',
          target: this.countLinks.toString(),
        });

        // Se itera 
        this.update$.next(true);

      });
    }
  }

  // NOTA: Gran Parte de los comentarios anteriores aplican para los demás nodos

  addNodeComparar() {

    if (this.nodes.length <= 3) {

      this._getDataService.getTicketComparar().subscribe((resp: any) => {

        this.countNodes += 1;
        this.countLinks += 1;
        // El upperId aumenta en 1 para que el el link vaya desde el nodo anterior al nuevo
        this.upperId += 1;

        this.nodes.push({
          id: this.countNodes.toString(),
          label: "Comparar",
          upperId: this.upperId.toString(),
          data: resp.data

        })

        // Se recorre la lista de nodos, para confirmar si tiene tiene upperId
        for (const node of this.nodes) {

          if (!node.upperId) {
            continue;
          }

          // Se crea un link, que va desde el upperId(anterior nodo), hasta el id del nuevo nodo
          const link: Edge = {
            source: node.upperId,
            target: node.id,
          };

          this.links.push(link);
          this.update$.next(true)
        }
      });
    }
  }

  addNodeCondiciones() {

    if (this.nodes.length <= 3) {

      this._getDataService.getTicketCondiciones().subscribe((resp: any) => {

        this.countNodes += 1;
        this.countLinks += 1;
        this.upperId += 1;

        this.nodes.push({
          id: this.countNodes.toString(),
          label: "Condiciones",
          upperId: this.upperId.toString(),
          data: resp.data
        })

        for (const node of this.nodes) {
          if (!node.upperId) {
            continue;
          }

          const link: Edge = {
            source: node.upperId,
            target: node.id,
          };

          this.links.push(link);
          this.update$.next(true)
        }
      });
    }

  }

  addNodeFinal() {

    if (this.nodes.length <= 3) {

      this._getDataService.getTicketFinal().subscribe((resp: any) => {

        this.countNodes += 1;
        this.countLinks += 1;
        this.upperId += 1;

        this.nodes.push({
          id: this.countNodes.toString(),
          label: "Final",
          upperId: this.upperId.toString(),
          data: resp.data
        })

        for (const node of this.nodes) {
          if (!node.upperId) {
            continue;
          }

          const link: Edge = {
            source: node.upperId,
            target: node.id,

          };

          this.links.push(link);
          this.update$.next(true)
        }
      });
    }

  }

  // Función final que hará el post del ticket
  postTicket() {
    window.alert("Todo está OK")
    location.reload();
  }

  // Se define un color para todas las cards
  public getStyles(node: Node): any {
    return {
      //'background-color': node.data.backgroundColor
      'background-color': '#f3ecc2'
    };
  }
}