// Script para o módulo de Chamada de Alunos

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const dataInput = document.getElementById('dataAula');
    if (dataInput) dataInput.value = today;

    const turmaSelect = document.getElementById('turma');
    const searchInput = document.querySelector('.search-box input');
    const tbody = document.querySelector('.attendance-table tbody');

    const turmas = {
        'Turma A - Jiu-Jitsu (Seg/Qua 19h)': [
            { id: 1001, nome: 'João da Silva', plano: 'Plano Premium', status: 'Regular' },
            { id: 1005, nome: 'Bruno Ribeiro', plano: 'Plano Básico', status: 'Pendente' }
        ],
        'Turma B - Muay Thai (Ter/Qui 20h)': [
            { id: 2001, nome: 'Maria Oliveira', plano: 'Plano Básico', status: 'Pendente' },
            { id: 2002, nome: 'Ana Santos', plano: 'Plano Premium', status: 'Inadimplente' }
        ],
        'Turma C - Judô (Sex 18h)': [
            { id: 3001, nome: 'Carlos Souza', plano: 'Plano Intermediário', status: 'Regular' },
            { id: 3002, nome: 'Fernanda Lima', plano: 'Plano Premium', status: 'Regular' }
        ]
    };

    function statusBadge(status) {
        const s = status.toLowerCase();
        if (s === 'regular') return '<span class="badge bg-success">Regular</span>';
        if (s === 'pendente') return '<span class="badge bg-warning text-dark">Pendente</span>';
        if (s === 'inadimplente') return '<span class="badge bg-danger">Inadimplente</span>';
        return status;
    }

    function loadTurma(nome) {
        tbody.innerHTML = '';
        const alunos = turmas[nome] || [];
        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.plano}</td>
                <td>${statusBadge(aluno.status)}</td>
                <td><input type="text" class="form-control form-control-sm" placeholder="Observações"></td>
                <td>
                    <div class="d-flex gap-2">
                        <span class="attendance-badge present" onclick="markAttendance(this, 'present')">
                            <i class="bi bi-check-circle"></i> Presente
                        </span>
                        <span class="attendance-badge absent" onclick="markAttendance(this, 'absent')">
                            <i class="bi bi-x-circle"></i> Falta
                        </span>
                        <span class="attendance-badge justified" onclick="markAttendance(this, 'justified')">
                            <i class="bi bi-info-circle"></i> Justificada
                        </span>
                    </div>
                </td>`;
            tbody.appendChild(tr);
        });
    }

    if (turmaSelect) {
        turmaSelect.addEventListener('change', e => {
            loadTurma(e.target.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.attendance-table tbody tr').forEach(row => {
                const alunoName = row.cells[1].textContent.toLowerCase();
                row.style.display = alunoName.includes(term) ? '' : 'none';
            });
        });
    }
});

function markAttendance(element, status) {
    const row = element.closest('tr');
    const badges = row.querySelectorAll('.attendance-badge');
    badges.forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    console.log(`Aluno ID: ${row.cells[0].textContent}, Status: ${status}`);
}
