const terminalContent = document.getElementById('terminal-content');

const commands = [
    { cmd: "whoami", res: "DevOps Engineer / Former Java Dev" },
    { cmd: "uptime --experience", res: "Java: 5 yrs | DevOps: 2+ yrs | Total: 5+ yrs" },
    { cmd: "locate --skills", res: "AWS, Terraform, Ansible, K8s, Helm" },
    { cmd: "check --observability", res: "AI-driven monitoring... [OK]" },
    { cmd: "ls /projects", res: "serverless-app  3-tier-stack  k8s-cluster" },
    { cmd: "cat message.txt", res: "Bridging the gap between code and infrastructure." }
];

let cmdIndex = 0;

function typeCommand() {
    if (cmdIndex < commands.length) {
        let currentCmd = commands[cmdIndex];
        let i = 0;
        
        // Create prompt line
        let line = document.createElement('div');
        line.innerHTML = `<span style="color: #38bdf8">user@prod:~$ </span><span id="typing-${cmdIndex}"></span>`;
        terminalContent.appendChild(line);

        function type() {
            if (i < currentCmd.cmd.length) {
                document.getElementById(`typing-${cmdIndex}`).innerHTML += currentCmd.cmd.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                // Command finished, show result
                let response = document.createElement('div');
                response.style.color = "#94a3b8";
                response.style.marginBottom = "10px";
                response.innerHTML = currentCmd.res;
                terminalContent.appendChild(response);
                cmdIndex++;
                setTimeout(typeCommand, 500);
            }
        }
        type();
    }
}

// Reveal elements on scroll
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', () => {
    revealElements();
    typeCommand();
});