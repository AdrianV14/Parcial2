<template>
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="row"> 
                
                    <div class="col">
                        <label for="nombre" class="form-label">Nombre Completo</label>
                        <input type="text" class="form-control" id="nombre" v-model="nombre" required>
                    </div>
                    <div class="col">
                        <label for="rfc" class="form-label">RFC</label>
                        <input type="text" placeholder="13 o 14 caracteres" class="form-control" id="rfc" v-model="rfc" max="14" min="13" required>
                    </div>
                    <div class="col-1">
                        <label for="edad" class="form-label">Edad</label>
                        <input type="number" class="form-control" id="edad" v-model="edad" required>
                    </div>
                    
            </div>
            <div class="row"> 
                    <div class="col">
                        <label for="telefono" class="form-label">Telefono</label>
                        <input type="text" placeholder="" class="form-control" id="telefono" v-model="tel" min="10" required>
                    </div>
                    <div class="col">
                        <label for="fecha" class="form-label">Fecha</label>
                        <input type="text" class="form-control" id="telefono" v-model="fecha" disabled >
                    </div>
                    <div class="col">
                        <label for="correo" class="form-label">Correo</label>
                        <input type="email" placeholder="ejemplo@ejemplo" class="form-control" id="correo" aria-describedby="emailHelp" v-model="correo" required>
                        <div id="emailHelp" class="form-text">No compartiremos esta informacino con nadie mas.</div>
                    </div>
            </div>
            <div class="row"> 
                
                    <div class="col">
                        <label for="cantidad" class="form-label">Cantidad a prestar</label>
                        <input type="number" class="form-control" id="cantidad" v-model="cantidad" required>
                    </div>
                    <div class="col">
                        <label for="meses" class="form-label">Meses</label>
                        <input type="number" class="form-control" id="meses" v-model="meses" required>
                    </div>
                    <div class="col-3">
                        <label for="interes" class="form-label">Interes</label>
                        <input type="number" placeholder="Numero entero (sin signo de %)" class="form-control" id="interes" v-model="interes" required>
                    </div>
                    <div class="col">
                        <label for="total" class="form-label">Total a pagar</label>
                        <input type="text" class="form-control" id="total" v-model="total" disabled>
                    </div>
            </div>
                <button type="submit" :disabled="!isFormFilled" class="btn btn-primary">Calcular</button>
                <button @click="borrar()" class="btn btn-danger">Borrar</button>
            </form>
            <div v-if="check">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Mes</th>
                        <th scope="col">Cuota</th>
                        <th scope="col">Interes</th>
                        <th scope="col">Capital</th>
                        <th scope="col">Saldo</th>
                        </tr>
                    </thead>
                    <tbody v-for="n in this.meses" :key="n">
                        <tr>
                            <th scope="row">{{ n }}</th>
                            <td>${{ cuota }}</td>
                            <td>${{ int }}</td>
                            <td>${{ capital }}</td>
                            <td>${{ `${this.saldo[n-1]}` }}</td>
                        </tr>
                    </tbody>
                </table>
                <button @click="saveData()" class="btn btn-success">Guardar</button>
            </div>
    </div>
</template>

<script>

export default {
    
    name:"altas",

    data(){
        return{
            nombre: "",
            rfc: "",
            edad:"",
            tel:"",
            fecha: this.mostrarFecha(),
            cantidad:"",
            corre:"",
            meses:"",
            interes:"",
            total: 0,
            check:false,
            cuota:0,
            int:0,
            capital:0,
            saldo:0

        }
    },
    computed: {
        isFormFilled() {
            return this.name !== '' && this.email !== ''
        },
    },
    methods:{
        mostrarFecha() {
            const date = new Date();          
            const formatear = (date.getDate()) + "-" + (date.getMonth()+1)+ "-" + date.getFullYear()
            // Mostramos la fecha y hora en la consola                                   
            
            return formatear; 

        },
        submitForm() {
            if (this.isFormFilled) {
                this.total = this.cantidad * ((this.interes/100)+1)

            this.check=true

            this.cuota = this.total/this.meses
            this.capital = this.cantidad/this.meses
            this.int = this.cuota-this.capital
            this.saldo = this.total
            this.saldo = []
            var axu = this.total
            for(var i = 0; i < this.meses ; i++){
                axu = axu-this.cuota
                this.saldo.push(axu)
                console.log(axu);
            }
            }
        },
        saveData() {
            const content = {
                nombre: this.nombre,
                rfc: this.rfc,
                edad:this.edad,
                tel:this.tel,
                fecha: this.fecha,
                correo:this.correo,
                cantidad:this.cantidad,
                meses:this.meses,
                interes:this.interes,
                total: this.total,
                cuota:this.cuota,
                int:this.int,
                capital:this.capital,
                saldo:this.saldo
            }
            localStorage.setItem(this.nombre, JSON.stringify(content));
        },
        

        borrar (){
            
            this.nombre = ""
            this.rfc=""
            this.edad=""
            this.tel=""
            this.cantidad=""
            this.correo=""
            this.meses=""
            this.interes=""
            this.int=0
            this.total=0
            this.cuota=0
            this.capital=0
            this.saldo=[]
            this.check=false
        }
    },

    mounted () {
        this.mostrarFecha()
    }
}
</script>

<style scoped>
.container{
    align-content: center;
}

button{
    margin: 10px;
}
</style>