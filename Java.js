var Level=3;
var state={
    Start:"",
    End:""
};
var One_State=[];
var ALL_States=[];
var c=state;
var draggables=0;
var RODS=0;
var Source; //For undo purpose
var ElementInSource; //For undo purpose
var ElementInDestination; //For undo purpose
var Destination; //For undo purpose
var LastChildOfDestination; //For undo purpose
var temp=[]; //array for Undo purpose
var Redo=[]; //For Redo Purposes

function Undo()
{
    if(ALL_States.length>0)
    {
        console.log("Undo is pressed");
        temp=ALL_States[ALL_States.length-1];
        Redo.push(ALL_States[ALL_States.length-1]);
        ALL_States.pop();
        Source=document.getElementById(temp[1]);
        Destination=document.getElementById(temp[0]);

        ElementInSource=Source.lastChild;
        ElementInSource.style.top=(543-32*(Destination.children.length-1)).toString(10)+"px";
        console.log("EIS",ElementInSource);
        Source.removeChild(Source.lastChild);
        UpdatingTheCount(false);
        Destination.appendChild(ElementInSource);
        
        console.log(temp[0]);
    }

}
function RedoMove()
{
    console.log("Redo is pressed");
    if(Redo.length>0)
    {
        temp=Redo[Redo.length-1];
        ALL_States.push(temp);
        Redo.pop();
        Source=document.getElementById(temp[0]);
        Destination=document.getElementById(temp[1]);
        ElementInSource=Source.lastChild;
        ElementInSource.style.top=(543-32*(Destination.children.length-1)).toString(10)+"px";
        console.log("EIS",ElementInSource);
        Source.removeChild(Source.lastChild);
        Destination.appendChild(ElementInSource);
        UpdatingTheCount(true);
        console.log(temp[0]);
    }
}
function WhichDiskNoIsAtTheTopOfRod(Rod)
{
    V=(Rod.getElementsByClassName('disk1'));
    if(V.length==0)
        return 0;
    else
        return parseInt(V[V.length-1].getElementsByClassName("DiskValue")[0].innerHTML);
}

function UpdatingTheDiskToAddEvents()
{
    document.getElementById("Steps").innerHTML=0;
    draggables=document.querySelectorAll(".disk1");
    RODS=document.querySelectorAll(".rod");

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart',()=>{
            One_State=[];
           c.Start=draggable.parentElement.id;
           ParentOfToBeDrag=document.getElementById(c.Start);
           if(ParentOfToBeDrag.lastElementChild==draggable)
                draggable.classList.add('dragging');
        })
    });
    draggables.forEach(draggable => {
        draggable.addEventListener('dragend',()=>{
        c.End=draggable.parentElement.id;
        if(c.Start!=c.End)
        {
            One_State.push(c.Start);
            One_State.push(c.End);
            ALL_States.push(One_State);
            console.log(ALL_States.length);
        }
            draggable.classList.remove('dragging');
        })
    });
    for (let index = 0; index <RODS.length; index++) {
        let RodInstance=RODS[index];
        RODS[index].addEventListener('dragover',e=>{
            e.preventDefault();
            var DraggableTemp=document.querySelector('.dragging');
            //if(WhichDiskNoIsAtTheTopOfRod(RODS[index])>DiskNoOfTheDraggableElement(DraggableTemp))
           if(WhichDiskNoIsAtTheTopOfRod(RODS[index])<parseInt(DraggableTemp.getElementsByClassName("DiskValue")[0].innerHTML))
           {
            let TopValue=((543-32*(RodInstance.children.length-1)));
            DraggableTemp.style.top=TopValue.toString(10)+"px";
            Redo=[];
            RODS[index].appendChild(DraggableTemp);
            if(document.getElementById("Rod3").children.length==Level+1)
            {
                window.location.href="GameWon.html";
            }
            UpdatingTheCount(true);
           }
   })
}
}
function StringToInt(str)
{
    let number='';
    for (let index = 0; index < str.length; index++) {
        if(str[index]=='p')
            return parseInt(number);
        else
            number+=str[index];
    }
}
function LevelUpdate()
{
    document.getElementById("LevelShow").innerHTML=Level;
    SettingTheDisks();
    UpdatingTheDiskToAddEvents();
}
function PlayAgain()
{
    document.getElementById("LevelShow").innerHTML=Level;
    RemovingTheDisksForPlayAgain("Rod1",false);
    RemovingTheDisksForPlayAgain("Rod2",true);
    RemovingTheDisksForPlayAgain("Rod3",true);
    ALL_States=[]
    Redo=[]
    SettingTheDisks();
    UpdatingTheDiskToAddEvents();
}
function LevelUp() 
{
    if(Level<9)
    {
        Level+=1;
        document.getElementById("LevelShow").innerHTML=Level;
        SettingTheDisks();
    }
    
    RemovingTheDisksForPlayAgain("Rod1",false);
    RemovingTheDisksForPlayAgain("Rod2",true);
    RemovingTheDisksForPlayAgain("Rod3",true);
    SettingTheDisks();
    UpdatingTheDiskToAddEvents();
}
function LevelDown() 
{
    if(Level>3)
    {
        Level-=1;
        document.getElementById("LevelShow").innerHTML=Level;
        SettingTheDisks();
    }
    RemovingTheDisksForPlayAgain("Rod1",false);
    RemovingTheDisksForPlayAgain("Rod2",true);
    RemovingTheDisksForPlayAgain("Rod3",true);
    
    SettingTheDisks();
    UpdatingTheDiskToAddEvents();
}

function RemovingTheDisks()
{
    const element = document.getElementById("Rod1");
 	while (element.children.length>2) 
    {
 		element.removeChild(element.lastChild);
  	}

    SettingTheDisks();
    UpdatingTheDiskToAddEvents();
}
function RemovingTheDisksForPlayAgain(RodNo,NotRod1)
{
    const element = document.getElementById(RodNo);
    console.log(element);

 	while (element.children.length>2 || (NotRod1 && element.children.length>1)) 
    {
 		element.removeChild(element.lastChild);
        if(NotRod1 && element.children.length==2)
        {
            NotRod1=false;
        }
  	}
}
function UpdatingTheCount(IsIncrease)
{
    console.log("Enter count");
    const StepCount=document.getElementById("Steps");
    var step=parseInt(StepCount.innerHTML)
    if(IsIncrease)
    {
        StepCount.innerHTML=step+1;
    }
    else
    {
        StepCount.innerHTML=step-1;
    }
}

function SettingTheDisks()
{
    var DiskNo=1;
    var LastElement=document.getElementById('Rod1').lastElementChild;
    LastElement.getElementsByTagName('p')[0].innerHTML=DiskNo;
    let value=80+(Level-1)*10;
    LastElement.style.width=value.toString(10)+"px";
    LastElement.style.top="543px";
    DiskNo++;

    for (let DISK = 1; DISK <Level; DISK++) 
    {
        //Creating the clone of Last disk
        LastElement=document.getElementById('Rod1').lastElementChild;

        //LastTop=LastElement.style.width;
        let clone=LastElement.cloneNode(true);

        //Appending the disk which is now Last disk
        document.getElementById('Rod1').appendChild(clone);

        //Changing the properties of Last Disk
        Element=document.getElementById('Rod1').lastElementChild;

        value=(80+(Level-1)*10)-(DISK+1-1)*10;
        Element.style.width=value.toString(10)+"px";

        value=543-32*((DISK+1)-1);
        Element.style.top=value.toString(10)+"px";
        Element.getElementsByTagName('p')[0].innerHTML=DiskNo;
        DiskNo++;
    }
}
